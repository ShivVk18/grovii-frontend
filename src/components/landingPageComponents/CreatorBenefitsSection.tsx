'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiClock as ClockIcon,
  HiSparkles as SparklesIcon,
  HiFilm as FilmIcon,
  HiArrowTrendingUp as TrendingIcon,
  HiCheck as CheckIcon,
  HiXMark as XIcon
} from 'react-icons/hi2'

const benefits = [
  {
    title: "Eliminate Blank Page Anxiety",
    subtitle: "From vague spark to ready shoot in 30s",
    desc: "Never sit in front of a blank camera wondering what to say. Grovii gives you an actionable scene structure immediately.",
    icon: SparklesIcon,
    stat: "10x Faster Ideation"
  },
  {
    title: "Stop Retakes & Shooting Chaos",
    subtitle: "Camera angles, B-roll & dialogue lined up",
    desc: "Know exactly which shot to record next, where to position the camera, and how to deliver each line cleanly.",
    icon: FilmIcon,
    stat: "Cut Shooting Time by 70%"
  },
  {
    title: "Maximize First 3-Second Retention",
    subtitle: "Hooks built on proven virality frameworks",
    desc: "Prevent viewer drop-off with pattern-interrupt opening lines tailored to hook your exact niche audience.",
    icon: TrendingIcon,
    stat: "2x Higher Retention"
  },
  {
    title: "Batch & Publish Without Burnout",
    subtitle: "One idea → Reel + Short + LinkedIn + X",
    desc: "Turn one shoot into multiple pieces of content across platforms without spending your weekend writing post copies.",
    icon: ClockIcon,
    stat: "4x Consistency"
  }
]

export default function CreatorBenefitsSection() {
  return (
    <section className="w-full py-20 bg-background border-b border-border font-sans select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-secondary rounded-full px-3 py-1">
            Why Creators Use Grovii
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How Grovii helps you win on camera
          </h2>
          <p className="text-sm text-muted-foreground font-medium max-w-lg mx-auto">
            The difference between struggling to film one video and batching four videos in an afternoon.
          </p>
        </div>

        {/* 4 Core Value Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl border border-border bg-card p-7 space-y-4 flex flex-col justify-between hover:border-primary/30 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {b.stat}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {b.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary/80 mt-0.5">
                      {b.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Before vs. After Grovii Comparison Table */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-foreground">
              The Creator Transformation
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              See what changes when you have an AI Director in your pre-production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* The Old Way (Frustrating) */}
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
              <span className="text-xs font-bold text-destructive uppercase tracking-wider block">
                Without Grovii (The Hard Way)
              </span>
              <ul className="space-y-2 text-xs text-muted-foreground font-medium">
                <li className="flex items-start gap-2">
                  <XIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Staring at a blank screen for hours trying to outline a script</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Hitting record and rambling for 15 minutes before finding the point</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Realizing during editing that you forgot crucial B-roll cutaways</span>
                </li>
                <li className="flex items-start gap-2">
                  <XIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span>Publishing once every two weeks due to pre-production burnout</span>
                </li>
              </ul>
            </div>

            {/* With Grovii (Smooth) */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                With Grovii (The Director Way)
              </span>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Drop 1 sentence idea ➔ Complete scene-by-scene shoot plan in 30 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Step in front of the camera with exact framing, voiceover lines, and pacing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Clear shot checklist ensures all visual B-roll is captured on set</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Batch shoot 3–5 high-retention videos in a single relaxed afternoon</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
