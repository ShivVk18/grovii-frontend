"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  HiSquares2X2 as HomeIcon,
  HiPlusCircle as CreateIcon,
  HiFilm as StoryboardIcon,
  HiRectangleStack as TemplateIcon,
  HiChartBar as InsightsIcon,
  HiCog6Tooth as SettingsIcon,
  HiArrowRightOnRectangle as LogoutIcon,
  HiSparkles as SparklesIcon,
  HiClock as HistoryIcon
} from "react-icons/hi2"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

const navItems = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Create", href: "/dashboard/create", icon: CreateIcon },
  { name: "My Storyboards", href: "/dashboard/storyboards", icon: StoryboardIcon },
  { name: "Generations", href: "/dashboard/jobs", icon: HistoryIcon },
  { name: "Templates", href: "/dashboard/templates", icon: TemplateIcon },
  { name: "Insights", href: "/dashboard/analytics", icon: InsightsIcon },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/sign-in")
  }

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between border-r border-border bg-card/60 backdrop-blur-xl shrink-0 select-none z-30">
      {/* Top Header & Navigation */}
      <div className="flex flex-col p-5 space-y-6">
        
        {/* Brand Logo & Tagline */}
        <Link href="/dashboard" className="flex items-center gap-3 group px-2">
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-lg shadow-sm transition-transform duration-200 group-hover:scale-105">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-foreground flex items-center gap-1.5">
              Grovii
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              Your shoot planner
            </span>
          </div>
        </Link>

        {/* Primary Action Button */}
        <div className="px-1">
          <Link
            href="/dashboard/create"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm transition-all duration-200 hover:opacity-95 hover:shadow-md active:scale-[0.98]"
          >
            <SparklesIcon className="h-4 w-4" />
            <span>New Storyboard</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150 ${
                  isActive
                    ? "bg-primary/10 text-primary dark:text-primary-foreground dark:bg-primary/20 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary dark:text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Profile & Settings */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
            pathname === "/dashboard/settings"
              ? "bg-secondary text-foreground font-bold"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          <SettingsIcon className="h-4 w-4 text-muted-foreground shrink-0" />
          <span>Settings</span>
        </Link>

        <div className="pt-2 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-secondary text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-border">
              {user?.username?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground truncate">
                {user?.username || "Creator"}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium">
                {user?.credits !== undefined ? `${user.credits} credits` : "Active"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log out"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogoutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
