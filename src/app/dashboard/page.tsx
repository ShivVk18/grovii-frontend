'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, animate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  HiMagnifyingGlass as Search,
  HiPlus as Plus,
  HiVideoCamera as Video,
  HiDocumentText as FileText,
  HiClock as Clock,
  HiArrowRight as ArrowRight,
  HiArrowTrendingUp as TrendingUp,
  HiSparkles as Sparkles,
  HiSquare3Stack3D as Layers,
  HiDevicePhoneMobile as Smartphone,
  HiBolt as Zap,
  HiEllipsisVertical as MoreVertical,
  HiFolderOpen as FolderOpen
} from "react-icons/hi2"
import { useAuth } from "@/contexts/AuthContext"
import { storyboardService } from "@/services/storyboardService"
import { Storyboard } from "@/types"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as any

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
} as any

function AnimatedCounter({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent = Math.round(v).toString()
      }
    })

    return () => controls.stop()
  }, [value])

  return <span ref={ref}>0</span>
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [storyboards, setStoryboards] = useState<Storyboard[]>([])
  const [activeJobsCount, setActiveJobsCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [storyboardsData, jobsData] = await Promise.all([
          storyboardService.getStoryboards(),
          storyboardService.getJobs()
        ])
        setStoryboards(storyboardsData)
        
        const active = jobsData.filter(j => j.status === 'pending' || j.status === 'processing')
        setActiveJobsCount(active.length)
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  const filteredStoryboards = storyboards.filter(s =>
    (s.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (s.tone?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  )

  const avgDuration = storyboards.length > 0 
    ? Math.round(storyboards.reduce((acc, curr) => acc + (curr.duration || 0), 0) / storyboards.length)
    : 0

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-12 font-sans select-none max-w-7xl mx-auto"
    >
      
      {/* 1. Hero Section (Linear / Apple style) */}
      <motion.div variants={itemVariant} className="relative rounded-3xl overflow-hidden bg-card text-card-foreground p-8 md:p-12 shadow-sm border border-border">
        {/* Subtle gradient orb for premium feel */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
              Welcome back, {user?.username || 'Creator'}.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl font-medium leading-relaxed">
              Turn raw ideas into production-ready shoot plans, camera-directed storyboards, and multi-platform social posts with your AI Director.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <Button 
              size="lg" 
              onClick={() => router.push("/dashboard/create")}
              className="rounded-full shadow-md font-semibold px-6 gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Plan
            </Button>
            <div className="relative w-full sm:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, tones..."
                className="w-full pl-11 bg-secondary/50 border-border focus:bg-background rounded-full h-11 text-sm shadow-sm transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Stats Bento Grid */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Credits Remaining"
          value={user?.credits !== undefined ? <AnimatedCounter value={user.credits} /> : "0"}
          subText={user?.plan ? `${user.plan.toUpperCase()} Tier` : "Free Tier"}
          icon={<Zap className="h-5 w-5 text-amber-500" />}
        />
        <StatCard
          title="Active AI Jobs"
          value={<AnimatedCounter value={activeJobsCount} />}
          subText="Jobs processing in background"
          icon={<Sparkles className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Total Projects"
          value={<AnimatedCounter value={storyboards.length} />}
          subText="In your creative library"
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="Avg Duration"
          value={avgDuration > 0 ? <><AnimatedCounter value={avgDuration} />s</> : "0s"}
          subText="Optimized for short-form"
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
        />
      </motion.div>

      {/* 3. Quick Actions / Formats */}
      <motion.div variants={itemVariant} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Quick Actions</h2>
          <Button variant="ghost" onClick={() => router.push("/dashboard/create")} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            View All <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormatCard
            title="Instagram Reel"
            description="9:16 Portrait"
            icon={<Smartphone className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/create")}
          />
          <FormatCard
            title="TikTok Video"
            description="High Hook Density"
            icon={<Zap className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/create")}
          />
          <FormatCard
            title="YouTube Shorts"
            description="Search Optimized"
            icon={<Video className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/create")}
          />
          <FormatCard
            title="Custom Canvas"
            description="Freeform Aspect"
            icon={<Layers className="h-5 w-5" />}
            onClick={() => router.push("/dashboard/create")}
          />
        </div>
      </motion.div>

      {/* 4. Recent Storyboards Gallery */}
      <motion.div variants={itemVariant} className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Recent Projects</h2>
            <p className="text-sm text-muted-foreground mt-1">Pick up right where you left off</p>
          </div>
        </div>

        {loading ? (
          <div className="glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <h3 className="text-sm font-medium text-muted-foreground">Loading your projects...</h3>
          </div>
        ) : filteredStoryboards.length === 0 ? (
          <div className="glass-panel rounded-3xl border-dashed p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">No projects found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">We couldn't find any storyboards matching your search term. Try adjusting your filters or create a new one.</p>
            <Button className="mt-6 rounded-full" onClick={() => router.push("/dashboard/create")}>
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStoryboards.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="group glass-panel rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-72 border border-border"
                onClick={() => router.push(`/dashboard/storyboards/${item.id}`)}
              >
                {/* Visual Thumbnail */}
                <div className="h-40 bg-secondary/50 p-4 flex flex-col justify-end relative overflow-hidden">
                  {item.thumbnail_url && (
                    <div className="absolute inset-0 z-0">
                      <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-[10px] font-bold text-foreground z-10">
                    {item.platform === 'YouTube' ? '16:9' : '9:16'}
                  </div>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-200 z-10">
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-md rounded-md text-foreground hover:bg-background">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="w-full relative z-10">
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block mb-1 drop-shadow-md">Script Preview</span>
                    <p className="text-white font-medium text-xs leading-snug line-clamp-2 drop-shadow-md">
                      “{item.idea}”
                    </p>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-card">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                      <span>{item.platform}</span>
                      <span>•</span>
                      <span>{item.duration}s</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-border mt-3">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="font-semibold text-[10px] rounded-md px-2 py-0.5">
                        {item.tone}
                      </Badge>
                      <Badge variant="outline" className="font-semibold text-[10px] rounded-md px-2 py-0.5 border-primary/20 text-primary">
                        {item.status}
                      </Badge>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function FormatCard({ title, description, icon, onClick }: { title: string; description: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-panel p-5 rounded-3xl hover:border-primary/50 transition-colors duration-300 cursor-pointer flex flex-col justify-between h-36 select-none group text-left"
    >
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground font-medium mt-1">{description}</p>
      </div>
    </motion.div>
  )
}

function StatCard({ title, value, subText, icon }: { title: string; value: React.ReactNode; subText: string; icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group select-none text-left flex flex-col justify-between h-36">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"></div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
          {title}
        </h3>
        <div className="p-2 rounded-xl bg-secondary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground tracking-tight">
          {value}
        </p>
        <p className="text-xs text-muted-foreground font-medium mt-1">
          {subText}
        </p>
      </div>
    </div>
  )
}
