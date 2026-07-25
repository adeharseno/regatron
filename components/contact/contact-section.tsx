import { MapPin, AtSign, Phone } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { ContactForm, type ContactFormCopy } from './contact-form'
import type { ContactPageContent } from '@/sanity/lib/types'

export function ContactSection({
  dict,
  locale,
  content,
}: {
  dict: Dictionary
  locale: string
  content?: ContactPageContent | null
}) {
  const t = dict.contact

  const details = [
    {
      Icon: MapPin,
      label: content?.addressLabel || t.addressLabel,
      value: content?.address || t.address,
    },
    {
      Icon: AtSign,
      label: content?.emailLabel || t.emailLabel,
      value: content?.email || t.email,
    },
    {
      Icon: Phone,
      label: content?.phoneLabel || t.phoneLabel,
      value: content?.phone || t.phone,
    },
  ]

  const cmsOptions =
    content?.form?.inquiryOptions
      ?.map((option) => option.label)
      .filter((label): label is string => Boolean(label)) || []

  const formCopy: ContactFormCopy = {
    fullName: content?.form?.fullNameLabel || t.form.fullName,
    company: content?.form?.companyLabel || t.form.company,
    phone: content?.form?.phoneLabel || t.form.phone,
    email: content?.form?.emailLabel || t.form.email,
    inquiryTypeLabel:
      content?.form?.inquiryTypeLabel || t.form.inquiryTypeLabel,
    inquiryOptions: cmsOptions.length ? cmsOptions : t.form.inquiryOptions,
    message: content?.form?.messageLabel || t.form.message,
    submit: content?.form?.submitLabel || t.form.submit,
    submitting: content?.form?.submittingLabel || t.form.submitting,
    successMessage:
      content?.form?.successMessage || t.form.successMessage,
    errorMessage: content?.form?.errorMessage || t.form.errorMessage,
  }

  return (
    <section className="overflow-hidden bg-white py-24 mt-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            <div className="max-w-md">
              <h1 className="mb-6 text-[40px] font-bold leading-none tracking-tight text-on-background">
                {content?.heading || t.heading}
              </h1>
              <p className="text-on-surface-variant">
                {content?.description || t.description}
              </p>
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
              <ContactForm locale={locale} copy={formCopy} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
