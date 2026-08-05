'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiVideoCamera as VideoCameraIcon,
  HiChatBubbleBottomCenterText as VoiceIcon,
  HiLightBulb as LightBulbIcon,
  HiSparkles as Sparkles
} from 'react-icons/hi2'

export default function StoryboardSection() {
  return (
    <section id="storyboard" className="w-full py-16 md:py-20 bg-[#FAF7F2] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/15">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Hero Feature
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Camera-Directed Storyboard
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium max-w-xl mx-auto">
            Every video plan comes with scene timing, exact visual actions, and spoken voiceover lines.
          </p>
        </div>

        {/* HERO FEATURE SINGLE SCENE CARD + "+4 MORE SCENES" */}
        <div className="max-w-2xl mx-auto space-y-4 pt-2">
          
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-3xl border-2 border-[#8B5E3C]/25 bg-[#FFF7F0] p-6 sm:p-7 shadow-2xl text-left space-y-4 relative overflow-hidden transition-shadow hover:shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center pb-3 border-b border-[#8B5E3C]/15">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#8B5E3C] text-white text-xs font-black">
                  1
                </span>
                <h3 className="text-base font-black text-[#3D2B1F]">
                  Scene 1: The Alarm Reset
                </h3>
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold py-0.5 px-2.5 bg-[#FAF1E8] text-[#8B5E3C] shadow-2xs">
                ⏱ 3 sec
              </Badge>
            </div>

            {/* What to Record */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#8B5E3C]/15 space-y-1">
              <span className="text-[10px] font-black text-[#3D2B1F] uppercase tracking-wider flex items-center gap-1.5">
                <VideoCameraIcon className="h-3.5 w-3.5 text-[#8B5E3C]" /> 🎥 What to Record (Visual Action)
              </span>
              <p className="text-xs font-medium text-[#3D2B1F] leading-relaxed">
                Macro close-up shot tapping phone alarm on bedside table, transitioning to morning blinds opening.
              </p>
            </div>

            {/* Camera Shot & Direction */}
            <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20 space-y-0.5">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                <LightBulbIcon className="h-3.5 w-3.5" /> 💡 Camera Shot & Framing
              </span>
              <p className="text-xs font-semibold text-[#3D2B1F]">
                Eye-level handheld movement with warm side sunlight. Keep lens clean.
              </p>
            </div>

            {/* Spoken Voiceover Line */}
            <div className="bg-[#FAF1E8] p-3.5 rounded-xl border border-[#8B5E3C]/20 space-y-1">
              <span className="text-[10px] font-black text-[#8B5E3C] uppercase tracking-wider flex items-center gap-1.5">
                <VoiceIcon className="h-3.5 w-3.5 text-[#8B5E3C]" /> 🗣 Spoken Voiceover
              </span>
              <p className="text-sm font-extrabold text-[#3D2B1F] italic">
                “Most productive days begin before everyone else wakes up.”
              </p>
            </div>
          </motion.div>

          {/* +4 More Scenes Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="p-3.5 rounded-2xl border border-dashed border-[#8B5E3C]/40 bg-[#FAF1E8]/60 text-center flex items-center justify-center gap-2 text-xs font-extrabold text-[#8B5E3C] cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>+4 more scenes generated automatically in your shoot plan</span>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
