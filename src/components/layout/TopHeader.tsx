"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  HiMagnifyingGlass as Search, 
  HiMoon as Moon, 
  HiSun as Sun, 
  HiPlus as Plus,
  HiArrowRightOnRectangle as LogoutIcon,
  HiCog6Tooth as SettingsIcon,
  HiSparkles as Sparkles
} from "react-icons/hi2"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

export function TopHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()  // revokes the session on the server
    toast.success("Logged out successfully")
    router.push("/sign-in")
  }

  const credits = user?.credits ?? 0
  const plan = user?.plan ? `${user.plan.charAt(0).toUpperCase()}${user.plan.slice(1)}` : "Free Plan"

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-card/60 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sm:px-8 select-none">
      
      {/* Left: Breadcrumbs / Space Title */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="text-xs font-bold text-foreground hover:text-primary transition-colors">
          Studio Workspace
        </Link>
        <span className="text-xs text-muted-foreground">/</span>
        <Badge variant="outline" className="text-[10px] font-semibold border-border text-muted-foreground">
          {plan}
        </Badge>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        
        {/* Credits Pill */}
        <Link
          href="/dashboard/settings"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-secondary text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>{credits} shoot plans left</span>
        </Link>

        {/* Quick New Storyboard Button */}
        <Button
          size="sm"
          onClick={() => router.push("/dashboard/create")}
          className="rounded-xl h-8 px-3 bg-primary text-primary-foreground font-bold text-xs gap-1 shadow-xs hover:opacity-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Plan</span>
        </Button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full bg-secondary text-primary font-bold text-xs flex items-center justify-center border border-border hover:border-primary/40 transition-colors"
          >
            {user?.username?.charAt(0).toUpperCase() || "C"}
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-10 w-48 rounded-2xl border border-border bg-card p-1.5 shadow-lg space-y-1 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-border/60">
                <p className="font-bold text-foreground truncate">{user?.username || "Creator"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email || ""}</p>
              </div>

              <button
                onClick={() => { setIsProfileOpen(false); router.push("/dashboard/settings"); }}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-left text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-medium"
              >
                <SettingsIcon className="h-3.5 w-3.5" />
                <span>Account Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-left text-destructive hover:bg-destructive/10 transition-colors font-semibold"
              >
                <LogoutIcon className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  )
}
