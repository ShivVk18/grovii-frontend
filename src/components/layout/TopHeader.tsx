"use client"

import React from "react"
import { Search, Bell, Sparkles, Moon, Sun, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function TopHeader() {
  // Mock states for UI purposes
  const [isDark, setIsDark] = React.useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-40 h-[72px] w-full bg-header-bg backdrop-blur-xl border-b border-border flex items-center justify-between px-8">
      
      {/* Left Area: Workspace Switcher & Status */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold shadow-sm">
            G
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              Personal Workspace
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Free Plan</span>
          </div>
        </button>

        <div className="h-4 w-[1px] bg-border mx-2 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-3">
          <Badge variant="outline" className="text-[10px] font-medium border-border text-muted-foreground bg-background/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Auto-saved
          </Badge>
          <Badge variant="outline" className="text-[10px] font-medium border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Ready
          </Badge>
        </div>
      </div>

      {/* Middle Area: Search */}
      <div className="hidden lg:flex max-w-md w-full relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search projects, templates, assets..." 
          className="w-full pl-9 bg-background/50 border-border/50 focus:bg-background rounded-full h-10 text-sm shadow-sm transition-all duration-300 focus-visible:ring-1 focus-visible:ring-primary/20"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right Area: Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
          <div className="flex items-center gap-1.5 px-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full h-7 border border-amber-500/20">
            <Sparkles className="h-3 w-3" />
            <span>120</span>
          </div>
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-muted-foreground hover:text-foreground">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <Button size="sm" className="rounded-full hidden sm:flex h-9 px-4 gap-2 shadow-sm font-semibold">
          <Download className="h-4 w-4" />
          Export
        </Button>

        <button className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-background shadow-sm ml-2 overflow-hidden flex items-center justify-center">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" alt="Avatar" className="h-full w-full object-cover" />
        </button>
      </div>

    </header>
  )
}
