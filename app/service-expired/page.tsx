export const metadata = {
  title: 'Service Notice',
  robots: { index: false, follow: false },
}

export default function ServiceExpiredPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="rounded-2xl border border-border bg-white p-10 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-cobalt">Service Notice</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
          Website Service Temporarily Paused
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-steel">
          Public access to this website is currently suspended pending service renewal. Site administrators may continue to sign in via the management console.
        </p>
      </div>
    </div>
  )
}
