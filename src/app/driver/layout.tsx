import { DriverHeader } from '@/components/driver/DriverHeader'

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DriverHeader />
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}