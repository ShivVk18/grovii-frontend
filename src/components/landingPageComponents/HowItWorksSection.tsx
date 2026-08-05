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

const timelineSteps = [
  {
    number: "01",
    title: "Idea Prompt",
    subtitle: "Describe what video you want to record in one raw sentence.",
    icon: <LightBulb className="h-5 w-5 text-amber-500" />,
    badge: "Input"
  },
  {
    number: "02",
    title: "Storyboard Plan",
    subtitle: "Get scene timing, visual camera angles, and spoken lines.",
    icon: <Film className="h-5 w-5 text-[#8B5E3C]" />,
    badge: "Generates"
  },
  {
    number: "03",
    title: "Record Flow",
    subtitle: "Follow clear camera direction and read lines effortlessly.",
    icon: <VideoCamera className="h-5 w-5 text-emerald-600" />,
    badge: "Filming"
  },
  {
    number: "04",
    title: "Publish Everywhere",
    subtitle: "Copy matching captions, hashtags, and social post versions.",
    icon: <Share2 className="h-5 w-5 text-purple-600" />,
    badge: "Output"
  }
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-20 bg-[#FFF7F0] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/15">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Editorial Timeline
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            How Grovii Works
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium">
            Four simple steps from raw idea to published video.
          </p>
        </div>

        {/* EDITORIAL TIMELINE WITH SEQUENTIAL SCROLL REVEAL */}
        <div className="relative pt-4">
          
          {/* Vertical Center Line */}
          <div className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#8B5E3C]/40 via-[#C48B5E]/30 to-[#8B5E3C]/40 pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pl-10 md:pl-0"
                >
                  {/* Left Content Box */}
                  <div className={`${isEven ? "md:block text-left md:text-right md:pr-10" : "md:hidden"} space-y-1`}>
                    {isEven && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-[#8B5E3C] bg-[#FAF1E8] border border-[#8B5E3C]/20 px-2.5 py-0.5 rounded-full inline-block">
                          STEP {step.number} • {step.badge}
                        </span>
                        <h3 className="text-lg font-black text-[#3D2B1F]">{step.title}</h3>
                        <p className="text-xs text-[#5C4033] font-medium leading-relaxed max-w-sm md:ml-auto">
                          {step.subtitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex justify-center items-center pointer-events-none col-span-2 absolute left-1/2 -translate-x-1/2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-[#FAF7F2] border-2 border-[#8B5E3C] shadow-md flex items-center justify-center pointer-events-auto cursor-pointer transition-transform"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Right Content Box */}
                  <div className={`${!isEven ? "md:block text-left md:pl-10" : "hidden md:block"}`}>
                    {!isEven && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-[#8B5E3C] bg-[#FAF1E8] border border-[#8B5E3C]/20 px-2.5 py-0.5 rounded-full inline-block">
                          STEP {step.number} • {step.badge}
                        </span>
                        <h3 className="text-lg font-black text-[#3D2B1F]">{step.title}</h3>
                        <p className="text-xs text-[#5C4033] font-medium leading-relaxed max-w-sm">
                          {step.subtitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-1">
                    <span className="text-[10px] font-black text-[#8B5E3C] bg-[#FAF1E8] border border-[#8B5E3C]/20 px-2.5 py-0.5 rounded-full inline-block">
                      STEP {step.number} • {step.badge}
                    </span>
                    <h3 className="text-base font-black text-[#3D2B1F]">{step.title}</h3>
                    <p className="text-xs text-[#5C4033] font-medium leading-relaxed">
                      {step.subtitle}
                    </p>
                  </div>

                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}