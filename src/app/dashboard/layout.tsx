'use client'

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Sidebar } from "@/components/layout/Sidebar"
import { TopHeader } from "@/components/layout/TopHeader"
import { OfflineBanner } from "@/components/layout/OfflineBanner"
import { Button } from "@/components/ui/button"
import { signInUrl } from "@/lib/session"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, problem, retry } = useAuth()

  useEffect(() => {
    if (isLoading || isAuthenticated || problem === "unreachable") return
    const next = pathname + (typeof window !== "undefined" ? window.location.search : "")
    router.replace(signInUrl({ expired: problem === "expired", next }))
  }, [isAuthenticated, isLoading, problem, pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  if (problem === "unreachable") {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center gap-3 bg-background text-center px-6">
        <h1 className="text-lg font-bold text-foreground">Can&apos;t reach Grovii right now</h1>
        <p role="alert" className="text-sm text-muted-foreground">Check your connection. You&apos;re still signed in.</p>
        <Button onClick={retry} className="rounded-xl">Try again</Button>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground font-sans antialiased selection:bg-primary/20">
      
      {/* Left Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Navigation */}
        <TopHeader />
        <OfflineBanner />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto relative p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>

    </div>
  )
}
