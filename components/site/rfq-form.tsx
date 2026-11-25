'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, RefreshCw, Send } from 'lucide-react'

interface RfqFormProps {
  captchaScope: string
  defaultProduct?: string
  sourcePage?: string
}

export function RfqForm({ captchaScope, defaultProduct = '', sourcePage }: RfqFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState(defaultProduct)
  const [message, setMessage] = useState('')
  const [captchaCode, setCaptchaCode] = useState('')
  const [captchaImage, setCaptchaImage] = useState('')
  const [challengeToken, setChallengeToken] = useState('')
  const [loadingCaptcha, setLoadingCaptcha] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const loadCaptcha = useCallback(async () => {
    setLoadingCaptcha(true)
    try {
      const res = await fetch(`/api/captcha?scope=${encodeURIComponent(captchaScope)}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load verification code')
      const data = await res.json()
      setCaptchaImage(data.image || '')
      setChallengeToken(data.challengeToken || '')
      setCaptchaCode('')
    } catch {
      setError('Unable to load verification code. Please refresh.')
    } finally {
      setLoadingCaptcha(false)
    }
  }, [captchaScope])

  useEffect(() => {
    loadCaptcha()
  }, [loadCaptcha])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          phone,
          product,
          message,
          captchaCode,
          captchaScope,
          challengeToken,
          sourcePage: sourcePage || captchaScope,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Submission failed. Please check the verification code.')
        await loadCaptcha()
        return
      }
      setSuccess(true)
      setName('')
      setEmail('')
      setCompany('')
      setPhone('')
      setMessage('')
      await loadCaptcha()
    } catch {
      setError('Network error. Please try again or email info@gushengcustomgassprings.com.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${captchaScope}-name`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
            Your Name *
          </label>
          <input
            id={`${captchaScope}-name`}
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${captchaScope}-email`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
            Email Address *
          </label>
          <input
            id={`${captchaScope}-email`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="engineer@company.com"
            className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${captchaScope}-company`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
            Company Name
          </label>
          <input
            id={`${captchaScope}-company`}
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Tooling / OEM company"
            className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor={`${captchaScope}-phone`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
            Phone / WhatsApp
          </label>
          <input
            id={`${captchaScope}-phone`}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 / +49 / +86 ..."
            className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${captchaScope}-product`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
          Target Model / Cross-Reference Code
        </label>
        <input
          id={`${captchaScope}-product`}
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. GB1500-50, KALLER X1500, DADCO U.1600, or custom drawing"
          className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor={`${captchaScope}-message`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
          Force, Stroke, Quantity &amp; Requirements *
        </label>
        <textarea
          id={`${captchaScope}-message`}
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Specify initial force (daN), nominal stroke (mm), mounting flange (FA/FB/FC), quantity, or custom drawing notes..."
          className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
        />
      </div>

      {/* 4-Character Image CAPTCHA */}
      <div className="rounded-2xl border border-border bg-mist p-4">
        <label htmlFor={`${captchaScope}-captcha`} className="block text-xs font-semibold uppercase tracking-wider text-steel">
          Security Verification Code *
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            {captchaImage ? (
              <img
                src={captchaImage}
                alt="4-character verification code"
                width={148}
                height={46}
                className="h-[46px] w-[148px] rounded-lg border border-border bg-white object-contain"
              />
            ) : (
              <div className="flex h-[46px] w-[148px] items-center justify-center rounded-lg border border-border bg-white text-xs text-steel">
                Loading...
              </div>
            )}
            <button
              type="button"
              onClick={loadCaptcha}
              disabled={loadingCaptcha}
              aria-label="Refresh verification code"
              className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-border bg-white text-steel hover:border-cobalt hover:text-cobalt"
            >
              <RefreshCw className={`h-4 w-4 ${loadingCaptcha ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <input
            id={`${captchaScope}-captcha`}
            type="text"
            required
            maxLength={4}
            autoComplete="off"
            value={captchaCode}
            onChange={(e) => setCaptchaCode(e.target.value.toUpperCase())}
            placeholder="4 chars"
            className="h-[46px] w-32 rounded-xl border border-input bg-white px-3.5 font-mono text-base font-semibold tracking-widest text-ink uppercase placeholder:font-sans placeholder:text-xs placeholder:tracking-normal placeholder:text-slate-400 focus:border-cobalt focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <span>Thank you. Your technical inquiry has been received by Changzhou Gusheng Hardware Co., Ltd. Our engineering team will review your specifications and respond via email.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="press inline-flex w-full items-center justify-center gap-2 rounded-full bg-cobalt px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-cobalt/20 hover:bg-electric disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {submitting ? 'Submitting Inquiry...' : 'Submit Technical RFQ'}
      </button>
    </form>
  )
}
