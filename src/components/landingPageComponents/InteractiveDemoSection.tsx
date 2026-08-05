'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiSparkles as Sparkles,
  HiFilm as Film,
  HiClock as Clock,
  HiMusicalNote as Music,
  HiBookOpen as BookOpen,
  HiVideoCamera as VideoCameraIcon,
  HiChatBubbleBottomCenterText as VoiceIcon
} from 'react-icons/hi2'

const fullPromptText = "I want to make a Reel about productivity."

export default function InteractiveDemoSection() {
  const [typedText, setTypedText] = useState("")
  const [stage, setStage] = useState(0)

  // Auto-typing effect & step-by-step assembly
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullPromptText.length) {
        setTypedText(fullPromptText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        // Progress assembly stages with slight delays
        setTimeout(() => setStage(1), 400) // Hook
        setTimeout(() => setStage(2), 900) // Scene 1
        setTimeout(() => setStage(3), 1400) // Scene 2
        setTimeout(() => setStage(4), 1900) // Voiceover
        setTimeout(() => setStage(5), 2400) // Captions
        setTimeout(() => setStage(6), 2900) // Music
      }
    }, 45)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="demo" className="w-full pt-2 pb-20 md:pt-4 md:pb-24 relative font-sans select-none overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-8 relative z-10 text-center">
        
        {/* Floating Assembling Workspace */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Main Floating Glass Frame */}
          <div className="rounded-[32px] border-2 border-[#8B5E3C]/25 bg-[#FFF7F0] backdrop-blur-xl p-5 sm:p-8 shadow-2xl space-y-6 text-left relative overflow-hidden">
            
            {/* Ambient inner soft light */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#8B5E3C]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Prompt Typing Box */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-600" /> Input Concept
                </span>
                {stage > 0 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-500/15 px-3 py-0.5 rounded-full animate-bounce">
                    ⚡ Assembling Shoot Plan...
                  </span>
                )}
              </div>

              <div className="bg-[#FAF7F2] border border-[#8B5E3C]/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3 shadow-xs">
                <span className="text-[#3D2B1F] font-bold text-sm sm:text-base font-mono flex-1">
                  “{typedText}”
                  <span className="inline-block w-2 h-5 bg-[#8B5E3C] ml-1 animate-pulse align-middle" />
                </span>
              </div>
            </div>

            {/* Assembling Cards Section */}
            <div className="space-y-4 pt-2">
              
              {/* STAGE 1: HOOK CARD */}
              <AnimatePresence>
                {stage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="p-5 bg-gradient-to-r from-[#FAF1E8] via-[#FFF7F0] to-[#FAF7F2] border border-[#8B5E3C]/30 rounded-2xl relative shadow-sm"
                  >
                    <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest block mb-1">
                      ✨ Opening Hook (First 3 Seconds)
                    </span>
                    <p className="text-[#3D2B1F] font-extrabold text-base sm:text-lg leading-snug">
                      “Stop starting your workday in panic mode. Here is the 10-minute routine that saved my focus.”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE 2 & 3: SCENE CARDS STACK */}
              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {stage >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="bg-[#FAF7F2] border border-[#8B5E3C]/20 p-4 rounded-2xl space-y-2.5 shadow-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-[#3D2B1F] flex items-center gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#8B5E3C] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                          Alarm Reset
                        </span>
                        <Badge variant="secondary" className="text-[10px] font-bold bg-[#FAF1E8] text-[#8B5E3C]">⏱ 3s</Badge>
                      </div>
                      <p className="text-xs text-[#5C4033] font-medium leading-relaxed">
                        🎥 <span className="font-bold text-[#3D2B1F]">What to Record:</span> Tap phone alarm, cut to sunlight opening blinds.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {stage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 18 }}
                      className="bg-[#FAF7F2] border border-[#8B5E3C]/20 p-4 rounded-2xl space-y-2.5 shadow-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-[#3D2B1F] flex items-center gap-2">
                          <span className="w-5 h-5 rounded-lg bg-[#8B5E3C] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                          Hydration First
                        </span>
                        <Badge variant="secondary" className="text-[10px] font-bold bg-[#FAF1E8] text-[#8B5E3C]">⏱ 4s</Badge>
                      </div>
                      <p className="text-xs text-[#5C4033] font-medium leading-relaxed">
                        🎥 <span className="font-bold text-[#3D2B1F]">What to Record:</span> Pour 500ml cold water near open balcony window.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* STAGE 4: VOICE OVER SCRIPT */}
              <AnimatePresence>
                {stage >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="p-4.5 bg-[#FAF1E8]/70 border border-[#8B5E3C]/20 rounded-2xl space-y-1.5"
                  >
                    <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                      <VoiceIcon className="h-3.5 w-3.5 text-[#8B5E3C]" /> Voiceover Line
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#3D2B1F] italic select-text">
                      “Most productive days begin before everyone else wakes up. Step one: cold water before notifications.”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE 5 & 6: CAPTIONS + MUSIC */}
              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatePresence>
                  {stage >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="p-4 bg-[#FAF7F2] border border-[#8B5E3C]/20 rounded-2xl space-y-1 text-xs"
                    >
                      <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-wider block">💬 Post Caption</span>
                      <p className="font-semibold text-[#3D2B1F] line-clamp-2">
                        Small morning habits compound into peaceful days. Try this 10-min reset tomorrow. ☕ #Productivity
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {stage >= 6 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="p-4 bg-[#FAF7F2] border border-[#8B5E3C]/20 rounded-2xl space-y-1 text-xs"
                    >
                      <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-wider block">🎵 Audio Track</span>
                      <p className="font-extrabold text-[#3D2B1F]">
                        Golden Hour — JVKE <span className="font-normal text-[11px] text-[#8B5E3C]">(Trending 📈)</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
