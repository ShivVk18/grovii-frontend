'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HiPlus as Plus,
  HiArrowRight as ArrowRight,
  HiClock as Clock,
  HiSparkles as Sparkles,
  HiFilm as Film,
  HiFolder as Folder,
  HiRectangleStack as TemplateIcon,
  HiDevicePhoneMobile as PhoneIcon
} from "react-icons/hi2"
import { useAuth } from "@/contexts/AuthContext"
import { storyboardService } from "@/services/storyboardService"
import { Storyboard } from "@/types"

const curatedTemplates = [
  {
    id: "viral-hook",
    title: "60-Second Viral Hook & Story",
    category: "Short-Form",
    duration: 60,
    scenesCount: 5,
    description: "Pattern-interrupt hook followed by 3 core insights and a high-converting punchline CTA.",
    platform: "Reel / TikTok",
    prompt: "A 60s breakdown of a high-leverage habit that transforms creative focus"
  },
  {
    id: "educational-breakdown",
    title: "Step-by-Step Educational Reel",
    category: "Tutorial",
    duration: 45,
    scenesCount: 4,
    description: "Clear problem agitating, 3 quick actionable steps with on-screen text, and save prompt.",
    platform: "Instagram",
    prompt: "3 overlooked tools that streamline video pre-production and scriptwriting"
  },
  {
    id: "day-in-life",
    title: "Cinematic Aesthetic Vlog",
    category: "Lifestyle",
    duration: 30,
    scenesCount: 4,
    description: "Fast-paced visual B-roll cuts paired with reflective voiceover and ambient music.",
    platform: "YouTube Shorts",
    prompt: "A 30s morning creator routine focusing on deep work and physical energy"
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [quickIdea, setQuickIdea] = useState("")
  const [storyboards, setStoryboards] = useState<Storyboard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStoryboards = async () => {
      try {
        const data = await storyboardService.getStoryboards()
        setStoryboards(data)
      } catch (error) {
        console.error("Failed to fetch storyboards", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStoryboards()
  }, [])

  const handleStartWithIdea = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickIdea.trim()) {
      router.push("/dashboard/create")
      return
    }
    router.push(`/dashboard/create?idea=${encodeURIComponent(quickIdea.trim())}`)
  }

  const handleUseTemplate = (promptText: string) => {
    router.push(`/dashboard/create?idea=${encodeURIComponent(promptText)}`)
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* ── 1. Hero Prompt-First Creation Box ── */}
      <section className="relative rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-xs overflow-hidden">
        {/* Subtle warm accent ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-primary tracking-wide uppercase">
              AI Director Workspace
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              What are you creating today, {user?.username || 'Creator'}?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
              Drop an idea or topic. Grovii turns it into a scene-by-scene shoot plan with hooks, camera angles, and voiceover scripts.
            </p>
          </div>

          <form onSubmit={handleStartWithIdea} className="pt-2 space-y-3">
            <div className="relative flex items-center">
              <input
                type="text"
                value={quickIdea}
                onChange={(e) => setQuickIdea(e.target.value)}
                placeholder="e.g. 5 morning habits that doubled my output as a solo creator..."
                className="w-full h-14 pl-5 pr-36 rounded-2xl bg-secondary/50 border border-border focus:border-primary/40 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 transition-all"
              />
              <div className="absolute right-2">
                <Button 
                  type="submit"
                  className="rounded-xl h-10 px-4 bg-primary text-primary-foreground font-semibold text-xs gap-1.5 shadow-sm hover:opacity-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start Plan</span>
                </Button>
              </div>
            </div>

            {/* Quick Prompt Pill Starters */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-muted-foreground">
              <span className="text-[11px] font-semibold text-muted-foreground/80">Try starting with:</span>
              <button
                type="button"
                onClick={() => setQuickIdea("How to build a personal brand in 2026 without burning out")}
                className="px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground text-[11px] transition-colors"
              >
                Personal Brand Strategy
              </button>
              <button
                type="button"
                onClick={() => setQuickIdea("My top 3 camera setups for crisp talking-head videos")}
                className="px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground text-[11px] transition-colors"
              >
                Creator Tech Setup
              </button>
              <button
                type="button"
                onClick={() => setQuickIdea("Why 90% of creators quit in month 2 and how to beat it")}
                className="px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary border border-border/60 text-muted-foreground hover:text-foreground text-[11px] transition-colors"
              >
                Creator Mindset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── 2. Recent Storyboards ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
              <Film className="h-4 w-4 text-primary" />
              Recent Storyboards
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Pick up where you left off or export shoot plans to your phone.
            </p>
          </div>
          {storyboards.length > 0 && (
            <Link
              href="/dashboard/storyboards"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View all ({storyboards.length})
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-2xl border border-border bg-card animate-pulse" />
            ))}
          </div>
        ) : storyboards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/40 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary text-primary mx-auto flex items-center justify-center">
              <Folder className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground">No storyboards yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Generate your first shoot plan to see camera directions, scripts, and scene cues here.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => router.push("/dashboard/create")}
              className="rounded-xl font-bold text-xs bg-primary text-primary-foreground gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Create First Shoot Plan
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {storyboards.slice(0, 6).map((sb) => {
              const scenesCount = sb.scenes?.length || 4
              const formattedDate = sb.created_at 
                ? new Date(sb.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "Recently"

              return (
                <Link
                  key={sb.id}
                  href={`/dashboard/storyboards/${sb.id}`}
                  className="group rounded-2xl border border-border bg-card p-5 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-primary/30 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-secondary text-secondary-foreground border-none">
                        {sb.platform || "Reels"}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {sb.duration || 30}s
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {sb.title || sb.idea || "Untitled Shoot Plan"}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium text-[11px]">
                      {scenesCount} scenes planned
                    </span>
                    <span className="text-[10px] text-muted-foreground/80 font-medium">
                      {formattedDate}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ── 3. Creator Templates ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
              <TemplateIcon className="h-4 w-4 text-primary" />
              Creator Blueprints & Templates
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Proven video structures optimized for retention and viewer engagement.
            </p>
          </div>
          <Link
            href="/dashboard/templates"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Explore all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {curatedTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-2xl border border-border bg-card p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                    {tpl.category}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {tpl.duration}s · {tpl.scenesCount} scenes
                  </span>
                </div>

                <h3 className="text-sm font-bold text-foreground">
                  {tpl.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUseTemplate(tpl.prompt)}
                className="w-full rounded-xl text-xs font-bold border-border hover:bg-secondary hover:text-foreground gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Use Blueprint
              </Button>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
