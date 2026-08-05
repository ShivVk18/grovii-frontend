'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiLightBulb as LightBulb,
  HiFilm as Film,
  HiVideoCamera as VideoCamera,
  HiShare as Share2
} from 'react-icons/hi2'

const steps = [
  {
    number: "01",
    title: "Describe your idea",
    description: "Type one sentence describing what video you want to record.",
    icon: <LightBulb className="h-7 w-7 text-amber-500" />
  },
  {
    number: "02",
    title: "Review your storyboard",
    description: "Get scene-by-scene timing, camera positions, and spoken lines.",
    icon: <Film className="h-7 w-7 text-primary" />
  },
  {
    number: "03",
    title: "Record scene by scene",
    description: "Open your shoot plan on your phone and record with total clarity.",
    icon: <VideoCamera className="h-7 w-7 text-emerald-500" />
  },
  {
    number: "04",
    title: "Publish your content",
    description: "Copy matching captions, hashtags, and multi-platform text copy.",
    icon: <Share2 className="h-7 w-7 text-purple-500" />
  }
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-24 bg-secondary/15 relative font-sans select-none border-y border-border/60">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Simple Workflow
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            How Grovii Works
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Four simple steps from raw idea to published video.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-3xl border border-border bg-card flex flex-col justify-between space-y-8 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-xl">
                  {s.number}
                </span>
                <div className="p-3 rounded-2xl bg-secondary/60 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-extrabold text-foreground leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}