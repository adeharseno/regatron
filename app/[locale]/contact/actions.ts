'use server'

import { isValidLocale } from '@/lib/i18n/config'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  error?: 'validation' | 'captcha' | 'configuration' | 'submission'
}

interface RecaptchaVerification {
  success?: boolean
  score?: number
  action?: string
  hostname?: string
  'error-codes'?: string[]
}

const RECAPTCHA_ACTION = 'contact_form'
const RECAPTCHA_MIN_SCORE = 0.5

function getText(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name)

  if (typeof value !== 'string') return ''

  return value.trim().slice(0, maxLength)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim()
  if (!secret) return { configured: false, valid: false }
  if (!token) return { configured: true, valid: false }

  const body = new URLSearchParams({ secret, response: token })
  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    },
  )

  if (!response.ok) return { configured: true, valid: false }

  const result = (await response.json()) as RecaptchaVerification
  return {
    configured: true,
    valid:
      result.success === true &&
      result.action === RECAPTCHA_ACTION &&
      typeof result.score === 'number' &&
      result.score >= RECAPTCHA_MIN_SCORE,
  }
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
  const recaptchaToken = getText(formData, 'recaptchaToken', 4096)

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
    const recaptcha = await verifyRecaptcha(recaptchaToken)
    if (!recaptcha.configured) {
      console.error('Contact form rejected: reCAPTCHA secret is not configured')
      return { status: 'error', error: 'configuration' }
    }
    if (!recaptcha.valid) {
      console.warn('Contact form rejected: reCAPTCHA verification failed')
      return { status: 'error', error: 'captcha' }
    }

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
