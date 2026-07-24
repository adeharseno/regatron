import "server-only";

import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface CatalogItem {
  no: number;
  prefix: string;
  category: string;
  code: string;
  name: string;
}

export function getCatalogItems(): CatalogItem[] {
  const source = readFileSync(
    join(process.cwd(), "data/e-waste-catalog.tsv"),
    "utf8",
  );

  return source
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [no, prefix, category, code, name] = line.split("\t");

      return {
        no: Number(no),
        prefix,
        category,
        code,
        name,
      };
    });
}
