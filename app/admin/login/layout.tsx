import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login | Changzhou Gusheng Hardware Co., Ltd.',
  robots: { index: false, follow: false },
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[70vh] bg-mist/60">{children}</div>
}
