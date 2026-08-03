'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  HiFilm as Film, 
  HiSparkles as Sparkles, 
  HiDocumentText as FileText, 
  HiMusicalNote as Music, 
  HiShare as Share2, 
  HiArrowPath as Repeat,
  HiCheckCircle as CheckCircle2,
  HiSquare3Stack3D as Layers
} from "react-icons/hi2"

const featuresList = [
  {
    icon: Film,
    title: 'Complete Video Plan',
    problem: 'Saves 2+ hours of manual storyboarding.',
    description: 'Divides your video into individual scene cards with explicit shot descriptions, camera angles, lighting setups, and visual actions.',
    outcome: 'Know exactly what to shoot'
  },
  {
    icon: Sparkles,
    title: 'High-Performing Hooks',
    problem: 'Eliminates 3-second drop-off rates.',
    description: 'Generates scroll-stopping opening lines tailored to your goal and audience to capture attention instantly.',
    outcome: 'Stop the scroll immediately'
  },
  {
    icon: FileText,
    title: 'Word-for-Word Scripts',
    problem: 'No more stumbling over words.',
    description: 'Drafts exact spoken dialogue segments and voiceover audio timed perfectly to matching visual b-roll actions.',
    outcome: 'Record voiceovers effortlessly'
  },
  {
    icon: Music,
    title: 'Trending Music Ideas',
    problem: 'Matches tone to viral audio cues.',
    description: 'Analyzes your video vibe to suggest matching music genres, audio moods, and pacing recommendations.',
    outcome: 'Set the perfect video mood'
  },
  {
    icon: Share2,
    title: 'Ready-to-Post Captions',
    problem: 'No caption writer’s block.',
    description: 'Creates multiple high-converting video captions and discoverability hashtags targeted for maximum algorithm reach.',
    outcome: 'Copy & paste directly to apps'
  },
  {
    icon: Repeat,
    title: 'Multi-Platform Distribution',
    problem: 'Maximizes content reach per video.',
    description: 'Transforms your video script into text-based posts for LinkedIn, Twitter threads, Instagram Carousels, and Newsletters.',
    outcome: 'Turn 1 video into 5 posts'
  }
]

export default function AITeamSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden border-t border-border/50 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-border text-xs font-bold text-foreground">
            <Layers className="h-3.5 w-3.5 text-primary" /> Everything Included
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Everything You Need For Every Reel
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            From the initial hook to multi-platform social posts, Grovii prepares every detail so you can focus on filming.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-3xl border border-border bg-card p-6 shadow-lg flex flex-col justify-between space-y-6 group hover:border-primary/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {item.problem}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <span className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {item.outcome}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
