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
  { id: 'idea', label: '1. Describe Your Idea', icon: Lightbulb, desc: 'Enter topic, goal, tone & platform in English', preview: '“5 Productive Morning Habits of High-Performing Founders”' },
  { id: 'hook', label: '2. Scroll-Stopping Hooks', icon: Sparkles, desc: 'First 3 seconds to catch attention', preview: '“Stop waking up at 5 AM. Do this 90-minute focus audit instead...”' },
  { id: 'scenes', label: '3. Scene Breakdown', icon: Layers, desc: 'What to film in every scene', preview: 'Scene 1: Extreme Close Up macro shot of coffee drip on wooden desk' },
  { id: 'script', label: '4. Voiceover Script', icon: FileText, desc: 'Word-for-word dialogue segments', preview: '“Most productivity advice is wrong. Here is what actually works on set...”' },
  { id: 'captions', label: '5. Video Captions', icon: Share2, desc: 'High-converting social captions', preview: '“The founder routine no one talks about. Tag a creator who needs this...”' },
  { id: 'music', label: '6. Music Vibe Match', icon: Music, desc: 'Bollywood Lo-Fi & Chill Beats', preview: 'Bollywood Lo-Fi Acoustic Beats (98% Match for Deep Focus tone)' },
  { id: 'repurpose', label: '7. Multi-Platform Posts', icon: Zap, desc: 'LinkedIn & Twitter ready copy', preview: 'Full breakdown article formatted for LinkedIn & X Threads' },
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
    <section id="how-it-works" className="py-24 relative overflow-hidden border-t border-[#8B5E3C]/20 bg-[#FAF7F2] select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF7F0] border border-[#8B5E3C]/20 text-xs font-bold text-[#8B5E3C]">
            <Camera className="h-3.5 w-3.5 text-[#8B5E3C]" /> Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3D2B1F] tracking-tight">
            How Grovii Builds Your Content Plan
          </h2>
          <p className="text-[#5C4033] text-base leading-relaxed">
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
                      ? 'bg-[#FFF7F0] border-[#8B5E3C]/50 shadow-lg scale-[1.02]' 
                      : 'bg-[#FFF7F0]/40 border-[#8B5E3C]/10 hover:bg-[#FFF7F0]/80 text-[#5C4033]/70'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#8B5E3C] text-white font-bold' : 'bg-[#FAF7F2] text-[#5C4033]'
                    }`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isActive ? 'text-[#3D2B1F]' : 'text-[#3D2B1F]/80'}`}>
                        {step.label}
                      </h3>
                      <p className="text-xs text-[#5C4033]/70">{step.desc}</p>
                    </div>
                  </div>

                  <div>
                    {isPast ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-ping block" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-[#8B5E3C]/20" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Live Preview Box */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-[#8B5E3C]/20 bg-[#FFF7F0] shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              <div className="flex justify-between items-center pb-5 border-b border-[#8B5E3C]/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-semibold text-[#3D2B1F]">
                    Step {activeStep + 1} of 7: <span className="font-bold">{creatorSteps[activeStep].label}</span>
                  </span>
                </div>
                <span className="text-xs font-mono bg-[#FAF7F2] border border-[#8B5E3C]/20 px-3 py-1 rounded-full text-[#8B5E3C] font-semibold">
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
                    <span className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider block">Content Plan Output</span>
                    <h4 className="text-xl font-bold text-[#3D2B1F]">
                      {creatorSteps[activeStep].label}
                    </h4>

                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#8B5E3C]/15 text-sm font-medium text-[#3D2B1F] leading-relaxed select-text">
                      {creatorSteps[activeStep].preview}
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#5C4033]/80 pt-2">
                      <span>Status: <span className="text-emerald-700 font-bold">✓ Ready to Film</span></span>
                      <span>Total Time: <span className="text-[#3D2B1F] font-bold">15 Seconds</span></span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden border border-[#8B5E3C]/10">
                <motion.div 
                  className="bg-[#8B5E3C] h-full rounded-full"
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
