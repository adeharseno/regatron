import { MapPin, AtSign, Phone } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

function Field({
  id,
  label,
  type = 'text',
}: {
  id: string
  label: string
  type?: string
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        className="peer w-full border-0 border-b border-outline-variant bg-transparent px-0 py-3 outline-none transition-all focus:border-primary"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-3 text-sm text-outline transition-all peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
      >
        {label}
      </label>
    </div>
  )
}

export function ContactSection({ dict }: { dict: Dictionary }) {
  const t = dict.contact

  const details = [
    { Icon: MapPin, label: t.addressLabel, value: t.address },
    { Icon: AtSign, label: t.emailLabel, value: t.email },
    { Icon: Phone, label: t.phoneLabel, value: t.phone },
  ]

  return (
    <section className="overflow-hidden bg-white py-24 mt-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            <div className="max-w-md">
              <h1 className="mb-6 text-[40px] font-bold leading-none tracking-tight text-on-background">
                {t.heading}
              </h1>
              <p className="text-on-surface-variant">{t.description}</p>
            </div>
            <div className="space-y-10">
              {details.map(({ Icon, label, value }) => (
                <div key={label} className="group flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container-low transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-outline">
                      {label}
                    </h4>
                    <p className="font-medium leading-relaxed text-on-surface">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <div className="relative border border-outline-variant bg-surface-container-lowest p-8 shadow-2xl md:p-14">
              <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 bg-primary/5" />
              <form className="space-y-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Field id="fullName" label={t.form.fullName} />
                  <Field id="company" label={t.form.company} />
                </div>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <Field id="phone" label={t.form.phone} type="tel" />
                  <Field id="email" label={t.form.email} type="email" />
                </div>

                <div className="relative">
                  <label
                    htmlFor="inquiryType"
                    className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-outline"
                  >
                    {t.form.inquiryTypeLabel}
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    defaultValue=""
                    className="w-full border-0 border-b border-outline-variant bg-transparent py-3 text-on-surface outline-none transition-all focus:border-primary"
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {t.form.inquiryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder=" "
                    className="peer w-full resize-none border-0 border-b border-outline-variant bg-transparent px-0 py-3 outline-none transition-all focus:border-primary"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-0 top-3 text-sm text-outline transition-all peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
                  >
                    {t.form.message}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-primary py-5 text-sm font-bold uppercase tracking-[0.2em] text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95"
                >
                  {t.form.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
