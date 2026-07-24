"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  Search,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogItem } from "@/lib/catalog-data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const ITEMS_PER_PAGE = 12;

const categoryImages: Record<string, string> = {
  ACC: "/images/service-supply.png",
  BAT: "/images/service-collection.png",
  CPU: "/images/hero-facility.png",
  DIS: "/images/service-sorting.png",
  HDD: "/images/service-supply.png",
  LGM: "/images/service-refining.png",
  MBH: "/images/service-sorting.png",
  PCB: "/images/service-refining.png",
  PRO: "/images/service-refining.png",
  RAM: "/images/service-sorting.png",
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);
  return [...pages]
    .filter((page) => page > 0 && page <= totalPages)
    .sort((a, b) => a - b);
}

interface CatalogGridProps {
  dict: Dictionary;
  items: CatalogItem[];
  locale: Locale;
}

export function CatalogGrid({ dict, items, locale }: CatalogGridProps) {
  const t = dict.catalog;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const activeCategory = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "code";
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const [searchInput, setSearchInput] = useState(query);

  const categories = useMemo(
    () =>
      Array.from(
        new Map(items.map((item) => [item.prefix, item.category])).entries(),
        ([prefix, category]) => ({ prefix, category }),
      ),
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase(locale);
    const result = items.filter((item) => {
      const matchesCategory = !activeCategory || item.prefix === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${item.code} ${item.name} ${item.category} ${item.prefix}`
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") {
        return (
          a.category.localeCompare(b.category) || a.code.localeCompare(b.code)
        );
      }
      return a.code.localeCompare(b.code, undefined, { numeric: true });
    });
  }, [activeCategory, items, locale, query, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(requestedPage, totalPages);
  const pageItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const visiblePages = getVisiblePages(currentPage, totalPages);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    const nextQuery = params.toString();
    router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: searchInput.trim() || null, page: null });
  }

  function goToPage(page: number) {
    updateParams({ page: page === 1 ? null : String(page) });
    document
      .getElementById("catalog-results")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  const startItem = filteredItems.length
    ? (currentPage - 1) * ITEMS_PER_PAGE + 1
    : 0;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length);

  return (
    <section
      id="catalog-results"
      className="scroll-mt-24 bg-surface-bright py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-12">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
            {t.grid.eyebrow}
          </span>
          <h2 className="max-w-2xl text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {t.grid.heading}
          </h2>
        </div>

        <div className="mb-10">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-6 border-outline-variant/50 pb-2 lg:flex-row lg:items-end"
          >
            <label className="group relative flex-1">
              <span className="sr-only">{t.ui.searchLabel}</span>
              <Search className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary" />
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={t.ui.searchPlaceholder}
                className="h-12 w-full border-b border-outline-variant bg-transparent pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-outline focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="h-12 cursor-pointer border-b border-primary px-1 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-opacity hover:opacity-65"
            >
              {t.ui.searchButton}
            </button>
            <label className="flex h-12 items-center gap-3 border-b border-outline-variant">
              <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-outline">
                {t.ui.sortLabel}
              </span>
              <select
                value={sort}
                onChange={(event) =>
                  updateParams({ sort: event.target.value, page: null })
                }
                className="h-full min-w-36 cursor-pointer bg-transparent text-sm font-semibold text-on-background outline-none"
              >
                <option value="code">{t.ui.sortCode}</option>
                <option value="name">{t.ui.sortName}</option>
                <option value="category">{t.ui.sortCategory}</option>
              </select>
            </label>
          </form>

          <div className="flex gap-7 overflow-x-auto pt-5 no-scrollbar">
            <button
              type="button"
              onClick={() => updateParams({ category: null, page: null })}
              className={
                "shrink-0 cursor-pointer border-b-2 px-0 py-2 text-xs font-bold uppercase tracking-wider transition-colors " +
                (!activeCategory
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-primary")
              }
            >
              {t.ui.allCategories}
            </button>
            {categories.map((category) => (
              <button
                key={category.prefix}
                type="button"
                onClick={() =>
                  updateParams({ category: category.prefix, page: null })
                }
                className={
                  "shrink-0 cursor-pointer border-b-2 px-0 py-2 text-xs font-bold uppercase tracking-wider transition-colors " +
                  (activeCategory === category.prefix
                    ? "border-primary text-primary"
                    : "border-transparent text-secondary hover:text-primary")
                }
              >
                {category.prefix}
                <span className="ml-2 font-medium normal-case tracking-normal opacity-70">
                  {category.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-7 flex flex-col justify-between gap-3 border-b border-outline-variant/40 pb-5 text-sm text-on-surface-variant sm:flex-row sm:items-center">
          <p>
            <strong className="font-bold text-on-background">
              {filteredItems.length}
            </strong>{" "}
            {t.ui.itemsFound}
          </p>
          <p>
            {t.ui.showing} {startItem}–{endItem} {t.ui.of}{" "}
            {filteredItems.length}
          </p>
        </div>

        {pageItems.length ? (
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((item) => (
              <article
                key={`${item.no}-${item.code}`}
                className="group overflow-hidden border border-outline-variant/30 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_45px_rgba(0,25,68,0.10)]"
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-navy">
                  <img
                    src={
                      categoryImages[item.prefix] ?? "/images/hero-facility.png"
                    }
                    alt=""
                    className="h-full w-full object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex h-11 min-w-11 items-center justify-center bg-primary px-3 text-xs font-black tracking-widest text-white">
                    {item.prefix}
                  </div>
                  <span className="absolute bottom-5 right-5 text-xs font-black tracking-widest text-white/80">
                    {item.code}
                  </span>
                </div>
                <div className="flex min-h-48 flex-col p-7">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-semibold leading-snug text-on-background">
                    {item.name}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 border-t border-outline-variant/30 pt-5 text-xs font-bold uppercase tracking-wider text-outline">
                    <PackageSearch className="h-4 w-4 text-primary" />
                    {t.ui.materialCode}: {item.code}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-outline-variant/40 bg-white px-6 py-24 text-center">
            <PackageSearch className="mx-auto mb-5 h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold text-on-background">
              {t.ui.emptyTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-on-surface-variant">
              {t.ui.emptyDescription}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                router.push(pathname, { scroll: false });
              }}
              className="mt-7 inline-flex cursor-pointer items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary"
            >
              <X className="h-4 w-4" />
              {t.ui.clearFilters}
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label={t.ui.paginationLabel}
            className="mt-14 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-11 cursor-pointer items-center gap-2 border border-outline-variant bg-white px-4 text-xs font-bold uppercase tracking-wider text-secondary transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{t.ui.previous}</span>
            </button>

            {visiblePages.map((page, index) => (
              <div key={page} className="flex items-center gap-2">
                {index > 0 && page - visiblePages[index - 1] > 1 && (
                  <span className="px-1 text-outline">…</span>
                )}
                <button
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={
                    "h-11 min-w-11 cursor-pointer border px-3 text-sm font-bold transition-colors " +
                    (page === currentPage
                      ? "border-primary bg-primary text-white"
                      : "border-outline-variant bg-white text-secondary hover:border-primary hover:text-primary")
                  }
                >
                  {page}
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-11 cursor-pointer items-center gap-2 border border-outline-variant bg-white px-4 text-xs font-bold uppercase tracking-wider text-secondary transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span className="hidden sm:inline">{t.ui.next}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
