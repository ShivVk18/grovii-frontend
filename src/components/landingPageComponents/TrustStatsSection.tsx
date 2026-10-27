'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiSparkles as Sparkles,
  HiGlobeAlt as GlobeIcon,
  HiClock as ClockIcon,
  HiVideoCamera as CameraIcon
} from 'react-icons/hi2'

const stats = [
  { value: "10,000+", label: "Shoot Plans Generated", icon: Sparkles },
  { value: "< 30 sec", label: "Idea to Complete Plan", icon: ClockIcon },
  { value: "15+ min", label: "Saved per video shoot", icon: CameraIcon },
  { value: "4 Platforms", label: "Reels, TikTok, Shorts, X", icon: GlobeIcon }
]

const creatorNiches = [
  "Talking-Head Creators",
  "UGC & Direct Response Marketers",
  "SaaS Founders & Educators",
  "Lifestyle & Travel Vloggers",
  "Productivity & Tech Reviewers"
]

export default function TrustStatsSection() {
  return (
    <section className="w-full py-20 bg-background border-b border-border font-sans select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-12 text-center">
        
        <div className="space-y-2 max-w-xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-secondary rounded-full px-3 py-1">
            Built for Real Creators
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Stop staring at a blank screen.
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Join thousands of creators saving hours on every video shoot.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl border border-border bg-card p-6 text-center space-y-3 shadow-xs hover:border-primary/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-secondary text-primary mx-auto flex items-center justify-center">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{s.value}</h3>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Creator Niches Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {creatorNiches.map((niche, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold border border-border"
            >
              {niche}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
