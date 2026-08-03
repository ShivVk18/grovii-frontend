'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  HiLightBulb as Lightbulb, 
  HiSparkles as Sparkles, 
  HiVideoCamera as Camera,
  HiArrowRight as ArrowRight
} from "react-icons/hi2"

const simpleSteps = [
  { 
    step: 'Step 1', 
    title: 'Describe Your Idea', 
    desc: 'Enter a single sentence topic, choose your platform (Reels, TikTok, Shorts), and pick a tone.',
    icon: Lightbulb 
  },
  { 
    step: 'Step 2', 
    title: 'Grovii Creates Your Content Plan', 
    desc: 'In 15 seconds, get your viral hooks, scene-by-scene shoot directions, script voiceovers, and captions.',
    icon: Sparkles 
  },
  { 
    step: 'Step 3', 
    title: 'Start Filming', 
    desc: 'Pick up your phone or camera and record with 100% clarity. Zero guesswork on set.',
    icon: Camera 
  }
]

export default function WorkflowTimelineSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20 border-t border-border/50 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-border text-xs font-bold text-foreground">
            3 Simple Steps
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Go From Prompt to Shoot Day
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Planning videos doesn't have to be complicated. Grovii turns raw ideas into camera-ready plans.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {simpleSteps.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="glass-panel p-8 rounded-3xl border border-border bg-card shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {item.step}
                    </span>
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
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
