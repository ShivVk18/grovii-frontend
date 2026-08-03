'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiLightBulb as Lightbulb, 
  HiSparkles as Sparkles, 
  HiSquare3Stack3D as Layers, 
  HiDocumentText as FileText, 
  HiShare as Share2, 
  HiMusicalNote as Music, 
  HiBolt as Zap, 
  HiCheckCircle as CheckCircle2,
  HiVideoCamera as Camera
} from "react-icons/hi2"

const creatorSteps = [
  { id: 'idea', label: '1. Describe Your Idea', icon: Lightbulb, desc: 'Enter topic, goal, tone & platform', preview: '“5 Morning Habits of High-Performing Founders”' },
  { id: 'hook', label: '2. Scroll-Stopping Hooks', icon: Sparkles, desc: 'First 3 seconds to catch attention', preview: '“Stop waking up at 5 AM. Do this instead...”' },
  { id: 'scenes', label: '3. Scene Breakdown', icon: Layers, desc: 'What to film in every scene', preview: 'Scene 1: Extreme Close Up macro shot of coffee drip' },
  { id: 'script', label: '4. Voiceover Script', icon: FileText, desc: 'Word-for-word dialogue segments', preview: '“Most productivity advice is wrong. Here is what works...”' },
  { id: 'captions', label: '5. Video Captions', icon: Share2, desc: 'High-converting social captions', preview: '“The founder routine no one talks about. Tag a friend...”' },
  { id: 'music', label: '6. Music Vibe Match', icon: Music, desc: 'Genre & audio mood suggestions', preview: 'Lo-Fi Deep Focus (98% Match for Introspective tone)' },
  { id: 'repurpose', label: '7. Multi-Platform Posts', icon: Zap, desc: 'LinkedIn & Twitter ready copy', preview: 'Full breakdown article formatted for LinkedIn' },
]

export default function AnimatedPipelineSection() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % creatorSteps.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden border-t border-border/50 bg-secondary/20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-border text-xs font-bold text-foreground">
            <Camera className="h-3.5 w-3.5 text-primary" /> Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            How Grovii Builds Your Content Plan
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            You don't need creative expertise or hours of scriptwriting. Grovii handles the entire planning phase in seconds.
          </p>
        </div>

        {/* Workflow Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Step List */}
          <div className="lg:col-span-5 space-y-2.5">
            {creatorSteps.map((step, idx) => {
              const Icon = step.icon
              const isActive = idx === activeStep
              const isPast = idx < activeStep

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive 
                      ? 'bg-card border-primary/40 shadow-lg scale-[1.02]' 
                      : 'bg-card/40 border-border/60 hover:bg-card/80 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-foreground text-background font-bold' : 'bg-secondary text-muted-foreground'
                    }`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                        {step.label}
                      </h3>
                      <p className="text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>

                  <div>
                    {isPast ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-primary animate-ping block" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-border" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Live Preview Box */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-border bg-card shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              <div className="flex justify-between items-center pb-5 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">
                    Step {activeStep + 1} of 7: <span className="font-bold">{creatorSteps[activeStep].label}</span>
                  </span>
                </div>
                <span className="text-xs font-mono bg-secondary px-3 py-1 rounded-full text-muted-foreground font-semibold">
                  Instant Output
                </span>
              </div>

              {/* Active Step Content */}
              <div className="py-8 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">Content Plan Output</span>
                    <h4 className="text-xl font-bold text-foreground">
                      {creatorSteps[activeStep].label}
                    </h4>

                    <div className="bg-secondary/60 p-5 rounded-2xl border border-border/80 text-sm font-medium text-foreground leading-relaxed select-text">
                      {creatorSteps[activeStep].preview}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <span>Status: <span className="text-emerald-500 font-semibold">✓ Ready to Film</span></span>
                      <span>Total Time: <span className="text-foreground font-bold">15 Seconds</span></span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-primary h-full rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeStep + 1) / creatorSteps.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
