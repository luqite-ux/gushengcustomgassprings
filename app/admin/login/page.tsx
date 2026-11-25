import { company } from '@/lib/site'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>
}) {
  const { error, reason } = await searchParams
  const notice =
    error ||
    (reason === 'unauthorized' ? 'Please sign in with your administrator account to continue.' : '')

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:py-24">
      <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
        <div className="text-center">
          <img
            src="/images/logo.png"
            alt={company.brand}
            className="mx-auto h-10 w-auto object-contain"
          />
          <h1 className="mt-4 text-xl font-semibold text-ink">Website Administration</h1>
          <p className="mt-1 text-xs text-steel">{company.legalName}</p>
        </div>

        {notice && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800"
          >
            {notice}
          </div>
        )}

        <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-xs font-semibold uppercase tracking-wider text-steel">
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="info@gushengcustomgassprings.com"
              className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink focus:border-cobalt focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-steel">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter password"
              className="mt-1.5 w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-ink focus:border-cobalt focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="press mt-2 w-full rounded-full bg-cobalt px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-electric"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
