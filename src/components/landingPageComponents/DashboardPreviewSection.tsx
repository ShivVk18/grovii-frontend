'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  HiSquare3Stack3D as Layers,
  HiPlus as Plus,
  HiVideoCamera as Video,
  HiDocumentText as FileText,
  HiClock as Clock,
  HiSparkles as Sparkles,
  HiFolderOpen as FolderOpen,
  HiFilm as Film,
  HiMusicalNote as Music,
  HiShare as Share2,
  HiCheck as Check,
  HiDocumentDuplicate as Copy,
  HiMagnifyingGlass as Search,
  HiArrowRight as ArrowRight,
  HiChevronRight as ChevronRight
} from 'react-icons/hi2'
import Link from 'next/link'

export default function DashboardPreviewSection() {
  const [activeNav, setActiveNav] = useState<'project' | 'projects' | 'analytics'>('project')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section id="dashboard-preview" className="w-full py-20 bg-secondary/15 relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Interactive Dashboard Tour
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            The Studio Dashboard You'll Use
          </h2>
          <p className="text-base text-muted-foreground font-medium max-w-xl mx-auto">
            Try the interactive preview below. When you sign in, you'll enter this exact workspace.
          </p>
        </div>

        {/* ── EMBEDDED DASHBOARD RECREATION ── */}
        <div className="glass-panel rounded-3xl border border-border bg-card shadow-2xl overflow-hidden min-h-[640px] flex flex-col md:flex-row text-left">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-secondary/40 border-r border-border/60 p-4 space-y-6 shrink-0 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Sidebar Header */}
              <div className="flex items-center gap-2 px-2 py-1">
                <img
                  src="/logo.png"
                  alt="Grovii"
                  className="w-7 h-7 rounded-xl object-cover shadow-xs border border-primary/20"
                />
                <span className="font-extrabold text-sm text-foreground tracking-tight">
                  Grovii Studio
                </span>
                <Badge variant="secondary" className="ml-auto text-[9px] font-bold px-1.5 py-0.5">
                  Pro
                </Badge>
              </div>

              {/* Sidebar Navigation */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 block mb-1">
                  Workspace
                </span>
                
                <button
                  onClick={() => setActiveNav('project')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeNav === 'project'
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Film className="h-4 w-4" /> Current Shoot Plan
                </button>

                <button
                  onClick={() => setActiveNav('projects')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeNav === 'projects'
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <FolderOpen className="h-4 w-4" /> Creative Library (4)
                </button>

                <button
                  onClick={() => setActiveNav('analytics')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeNav === 'analytics'
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Layers className="h-4 w-4" /> Credits & Analytics
                </button>
              </div>

              {/* Launch Wizard CTA */}
              <div className="pt-2 px-1">
                <Button size="sm" asChild className="w-full rounded-xl font-bold text-xs brand-gradient text-white shadow-xs py-2.5">
                  <Link href="/dashboard" className="flex items-center justify-center gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Launch Studio Wizard
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar Footer User Info */}
            <div className="pt-4 border-t border-border/50 px-2 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary font-black text-xs flex items-center justify-center">
                C
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-extrabold text-foreground truncate">Creator Studio</p>
                <p className="text-[10px] text-muted-foreground font-semibold">24 Credits Left</p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content Area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[640px]">
            
            {/* View 1: Current Active Shoot Plan Project */}
            {activeNav === 'project' && (
              <div className="space-y-6">
                
                {/* Project Header Banner */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-border/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] font-bold uppercase bg-secondary">
                        Instagram Reel
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-bold text-primary border-primary/20">
                        Inspirational Tone
                      </Badge>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mt-1">
                      Morning Routine Reset Reel
                    </h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" asChild className="rounded-full font-bold text-xs brand-gradient text-white">
                      <Link href="/dashboard">
                        Open Full Studio Workspace
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Hook Section */}
                <div className="p-4 bg-gradient-to-r from-primary/10 via-secondary/50 to-secondary/20 border border-primary/20 rounded-2xl relative">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">
                    ✨ Primary Hook (First 3 Seconds)
                  </span>
                  <p className="text-foreground font-extrabold text-base leading-snug">
                    “Stop starting your mornings in panic mode. Here is the 10-minute routine that saved my workday.”
                  </p>
                </div>

                {/* Storyboard Scenes Grid */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-extrabold text-foreground flex items-center gap-2">
                      <Film className="h-4 w-4 text-primary" /> Storyboard Shoot Plan (5 Scenes)
                    </h3>
                    <span className="text-xs text-muted-foreground font-semibold">20 Seconds Total</span>
                  </div>

                  {[
                    { num: 1, title: "The Alarm Struggle Cut", duration: "3s", show: "Hand tapping alarm on bedside table, transitioning to morning blinds opening.", say: "Most people wake up already 30 minutes behind schedule." },
                    { num: 2, title: "Hydration & Sunlight Reset", duration: "4s", show: "Pouring 500ml cold water into tall glass near open window.", say: "Step one: 500ml water before touching any notifications." },
                    { num: 3, title: "3 Priorities Notebook", duration: "5s", show: "Overhead view writing 3 key priorities in physical notebook.", say: "Step two: Write down the top 3 non-negotiables for today." }
                  ].map((s) => (
                    <div key={s.num} className="bg-card border border-border p-3.5 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 font-bold text-foreground">
                          <span className="w-6 h-6 rounded-lg bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {s.num}
                          </span>
                          {s.title}
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-bold py-0.5 px-2">
                          ⏱ {s.duration}
                        </Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-secondary/40 p-2 rounded-xl border border-border/40">
                          <span className="font-bold text-muted-foreground block">🎥 Visual Action:</span>
                          <span className="text-foreground font-medium">{s.show}</span>
                        </div>
                        <div className="bg-primary/5 p-2 rounded-xl border border-primary/20">
                          <span className="font-bold text-primary block">🗣 Spoken Line:</span>
                          <span className="text-foreground font-bold italic">“{s.say}”</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* View 2: Creative Library */}
            {activeNav === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/60 pb-3">
                  <h2 className="text-lg font-black text-foreground">Your Creative Library</h2>
                  <span className="text-xs text-muted-foreground font-bold">4 Saved Shoot Plans</span>
                </div>

                <div className="grid gap-3">
                  {[
                    { title: "Morning Routine Reset Reel", platform: "Instagram Reel", duration: "20s", tone: "Inspirational", date: "Today" },
                    { title: "Minimalist Desk Setup Unboxing", platform: "TikTok Video", duration: "35s", tone: "Aesthetic", date: "Yesterday" },
                    { title: "3 Focus Secrets for Remote Workers", platform: "YouTube Shorts", duration: "45s", tone: "Informative", date: "3 days ago" },
                    { title: "Weekly Content Batching Blueprint", platform: "Instagram Reel", duration: "30s", tone: "Educational", date: "1 week ago" }
                  ].map((p, idx) => (
                    <div key={idx} className="bg-card border border-border p-4 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px] font-bold">{p.platform}</Badge>
                          <span className="text-xs text-muted-foreground font-semibold">• {p.date}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-foreground">{p.title}</h4>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-full text-xs font-bold text-primary gap-1">
                        View Plan <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Credits & Analytics */}
            {activeNav === 'analytics' && (
              <div className="space-y-4">
                <div className="border-b border-border/60 pb-3">
                  <h2 className="text-lg font-black text-foreground">Studio Analytics & Credits</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-secondary/40 border border-border/50 p-4 rounded-2xl">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Credits Remaining</span>
                    <p className="text-2xl font-black text-primary mt-1">24 / 30</p>
                  </div>
                  <div className="bg-secondary/40 border border-border/50 p-4 rounded-2xl">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Plans Generated</span>
                    <p className="text-2xl font-black text-foreground mt-1">12</p>
                  </div>
                  <div className="bg-secondary/40 border border-border/50 p-4 rounded-2xl col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Avg Duration</span>
                    <p className="text-2xl font-black text-foreground mt-1">32s</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}
