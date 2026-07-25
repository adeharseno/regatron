'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitContactForm } from '@/app/[locale]/contact/actions'

const initialContactFormState: {
  status: 'idle' | 'success' | 'error'
} = {
  status: 'idle',
}

export interface ContactFormCopy {
  fullName: string
  company: string
  phone: string
  email: string
  inquiryTypeLabel: string
  inquiryOptions: string[]
  message: string
  submit: string
  submitting: string
  successMessage: string
  errorMessage: string
}

function Field({
  id,
  label,
  type = 'text',
  required = false,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        required={required}
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

export function ContactForm({
  locale,
  copy,
}: {
  locale: string
  copy: ContactFormCopy
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const submitWithLocale = submitContactForm.bind(null, locale)
  const [state, formAction, pending] = useActionState(
    submitWithLocale,
    initialContactFormState,
  )

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form ref={formRef} action={formAction} aria-busy={pending}>
      <fieldset
        disabled={pending}
        className="m-0 space-y-10 border-0 p-0 disabled:opacity-70"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor="regatronFormGuard">Leave this field empty</label>
          <input
            id="regatronFormGuard"
            name="regatronFormGuard"
            type="text"
            tabIndex={-1}
            autoComplete="new-password"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Field id="fullName" label={copy.fullName} required />
          <Field id="company" label={copy.company} />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Field id="phone" label={copy.phone} type="tel" required />
          <Field id="email" label={copy.email} type="email" required />
        </div>

        <div className="relative">
          <label
            htmlFor="inquiryType"
            className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-outline"
          >
            {copy.inquiryTypeLabel}
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            defaultValue=""
            required
            className="w-full border-0 border-b border-outline-variant bg-transparent py-3 text-on-surface outline-none transition-all focus:border-primary"
          >
            <option value="" disabled>
              —
            </option>
            {copy.inquiryOptions.map((option) => (
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
            required
            className="peer w-full resize-none border-0 border-b border-outline-variant bg-transparent px-0 py-3 outline-none transition-all focus:border-primary"
          />
          <label
            htmlFor="message"
            className="pointer-events-none absolute left-0 top-3 text-sm text-outline transition-all peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest"
          >
            {copy.message}
          </label>
        </div>

        {state.status !== 'idle' && (
          <p
            aria-live="polite"
            className={
              state.status === 'success'
                ? 'border-l-2 border-green-600 bg-green-50 px-4 py-3 text-sm text-green-800'
                : 'border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800'
            }
          >
            {state.status === 'success'
              ? copy.successMessage
              : copy.errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="flex w-full cursor-pointer items-center justify-center gap-3 bg-primary py-5 text-sm font-bold uppercase tracking-[0.2em] text-on-primary shadow-lg transition-all hover:bg-primary-container active:scale-95 disabled:cursor-wait disabled:opacity-70"
        >
          {pending && (
            <span
              aria-hidden="true"
              className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white"
            />
          )}
          <span>{pending ? copy.submitting : copy.submit}</span>
        </button>
      </fieldset>
    </form>
  )
}
