"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  HiSquares2X2 as LayoutDashboard, 
  HiFolder as FolderKanban, 
  HiFilm as Clapperboard, 
  HiViewColumns as LayoutTemplate, 
  HiPhoto as ImageIcon, 
  HiChartBar as LineChart, 
  HiCog6Tooth as Settings,
  HiSparkles as Sparkles
} from "react-icons/hi2"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const dockItems = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Studio", href: "/dashboard/create", icon: Clapperboard },
  { name: "Projects", href: "/dashboard/storyboards", icon: FolderKanban },
  { name: "AI Jobs", href: "/dashboard/jobs", icon: Sparkles },
  { name: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Assets", href: "/dashboard/assets", icon: ImageIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function LeftDock() {
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div className="w-[72px] bg-background/60 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-3xl py-4 flex flex-col items-center gap-3 shadow-2xl relative">
        <TooltipProvider delayDuration={100}>
          {dockItems.map((item, idx) => {
            const isActive = pathname === item.href
            const isHovered = hoveredIndex === idx

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link 
                    href={item.href}
                    className="relative w-12 h-12 flex items-center justify-center rounded-2xl group"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Hover Background animated using Framer Motion Layout */}
                    {isHovered && (
                      <motion.div
                        layoutId="dock-hover"
                        className="absolute inset-0 bg-primary/5 dark:bg-white/10 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                    
                    {/* Active Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="dock-active"
                        className="absolute -left-1 w-1.5 h-6 bg-primary dark:bg-white rounded-r-full"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <item.icon 
                      className={`h-5 w-5 transition-colors relative z-10 ${
                        isActive 
                          ? "text-primary dark:text-white" 
                          : "text-muted-foreground group-hover:text-foreground"
                      }`} 
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={20} className="rounded-xl px-3 py-1.5 text-xs font-semibold shadow-xl border-white/10 bg-background/80 backdrop-blur-xl">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    </div>
  )
}
