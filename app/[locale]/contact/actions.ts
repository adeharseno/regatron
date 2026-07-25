'use server'

import { isValidLocale } from '@/lib/i18n/config'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  error?: 'validation' | 'submission'
}

function getText(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name)

  if (typeof value !== 'string') return ''

  return value.trim().slice(0, maxLength)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function submitContactForm(
  locale: string,
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (!isValidLocale(locale)) {
    console.warn('Contact form rejected: invalid locale')
    return { status: 'error', error: 'validation' }
  }

  const fullName = getText(formData, 'fullName', 100)
  const company = getText(formData, 'company', 150)
  const phone = getText(formData, 'phone', 40)
  const email = getText(formData, 'email', 254).toLowerCase()
  const inquiryType = getText(formData, 'inquiryType', 120)
  const message = getText(formData, 'message', 5000)

  if (
    fullName.length < 2 ||
    phone.length < 5 ||
    !isValidEmail(email) ||
    !inquiryType ||
    message.length < 5
  ) {
    console.warn('Contact form rejected: invalid fields', {
      locale,
      hasFullName: fullName.length >= 2,
      hasPhone: phone.length >= 5,
      hasValidEmail: isValidEmail(email),
      hasInquiryType: Boolean(inquiryType),
      hasMessage: message.length >= 5,
    })
    return { status: 'error', error: 'validation' }
  }

  try {
    await getSanityWriteClient().create({
      _type: 'contactSubmission',
      status: 'new',
      fullName,
      company: company || undefined,
      phone,
      email,
      inquiryType,
      message,
      locale,
      submittedAt: new Date().toISOString(),
    })

    return { status: 'success' }
  } catch (error) {
    console.error('Failed to save contact submission', error)
    return { status: 'error', error: 'submission' }
  }
}
