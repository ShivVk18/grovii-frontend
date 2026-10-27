'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiSparkles as Sparkles,
  HiVideoCamera as CameraIcon,
  HiMusicalNote as MusicIcon,
  HiArrowsRightLeft as RepurposeIcon
} from 'react-icons/hi2'

const toolkitItems = [
  {
    title: "Viral Hook Formulator",
    badge: "0:00 - 0:03 Retention",
    desc: "Generate high-converting opening lines tested against proven creator frameworks (curiosity gap, pattern interrupt, contrarian take).",
    icon: Sparkles,
    preview: "“Most creators fail before 9 AM because of this one habit.”"
  },
  {
    title: "Camera & Framing Directions",
    badge: "Director Intelligence",
    desc: "Every scene specifies exact camera framing (close-up, eye-level, tracking), recommended movement, and natural lighting cues.",
    icon: CameraIcon,
    preview: "Eye-level 35mm · Slow push-in · Soft window light"
  },
  {
    title: "Audio & Music Suggestions",
    badge: "Audio Dynamics",
    desc: "Curated Spotify and TikTok audio recommendations selected to match the energy and tempo of your shoot.",
    icon: MusicIcon,
    preview: "Ambient electronic beat · 118 BPM · High energy"
  },
  {
    title: "Cross-Platform Repurposing",
    badge: "Distribution",
    desc: "Automatically repurpose your video script into high-engagement written posts for LinkedIn and X threads.",
    icon: RepurposeIcon,
    preview: "LinkedIn Post + Twitter / X Thread Starters"
  }
]

export default function CreativeToolkitBento() {
  return (
    <section id="toolkit" className="w-full py-20 bg-card border-b border-border font-sans select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-12 text-center">
        
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-secondary rounded-full px-3 py-1">
            Creator Studio Toolkit
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Everything you need before hitting Record
          </h2>
          <p className="text-sm text-muted-foreground font-medium max-w-lg mx-auto">
            From the initial spark to the final B-roll shot list, all creative assets are generated together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {toolkitItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl border border-border bg-secondary/20 p-7 space-y-4 flex flex-col justify-between hover:border-primary/30 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-md bg-secondary border border-border">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground italic select-text">
                  {item.preview}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
