'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiLightBulb as LightBulb,
  HiSparkles as Sparkles,
  HiVideoCamera as VideoCamera,
  HiShare as Share2
} from 'react-icons/hi2'

const steps = [
  {
    num: "01",
    title: "Raw Idea",
    desc: "Type a topic or vague concept. No need to write scripts or format prompts.",
    icon: LightBulb,
    tag: "Input"
  },
  {
    num: "02",
    title: "Viral Hook & Pacing",
    desc: "Grovii formulates high-retention opening hooks that stop the scroll in 3 seconds.",
    icon: Sparkles,
    tag: "Directing"
  },
  {
    num: "03",
    title: "Scene & Camera Blueprint",
    desc: "Get exact shot-by-shot directions: what to record, camera angles, voiceover, and B-roll.",
    icon: VideoCamera,
    tag: "Pre-Production"
  },
  {
    num: "04",
    title: "Record & Publish",
    desc: "Open Grovii on set to record seamlessly, then copy captions, tags, and repurposed threads.",
    icon: Share2,
    tag: "Output"
  }
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-20 bg-card border-b border-border font-sans select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-12 text-center">
        
        <div className="space-y-2 max-w-xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-secondary rounded-full px-3 py-1">
            Director Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            How Grovii works
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            From an unformed idea to a camera-ready blueprint in 4 simple stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl border border-border bg-secondary/20 p-6 space-y-4 flex flex-col justify-between hover:border-primary/30 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-primary">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-md bg-secondary border border-border">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-card border border-border flex items-center justify-center text-primary shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}