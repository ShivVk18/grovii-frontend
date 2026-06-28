'use client'

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { LeftDock } from "@/components/layout/LeftDock"
import { TopHeader } from "@/components/layout/TopHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground font-sans antialiased overflow-hidden selection:bg-primary/20">
      
      {/* Left Dock Navigation */}
      <LeftDock />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pl-[104px]"> 
        {/* pl-[104px] leaves room for the fixed 72px dock + margin on the left */}
        
        {/* Top Header Navigation */}
        <TopHeader />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </div>

    </div>
  )
}
