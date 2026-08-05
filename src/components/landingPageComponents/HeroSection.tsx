'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  HiArrowRight as ArrowRight,
  HiCheck as CheckIcon,
  HiSparkles as Sparkles,
  HiVideoCamera as VideoCameraIcon,
  HiChatBubbleBottomCenterText as VoiceIcon
} from 'react-icons/hi2'

const fullPromptText = "I want to make a Reel about productivity routines..."

const wordVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: "easeOut"
    }
  })
} as any

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullPromptText.length) {
        setTypedText(fullPromptText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => setStage(1), 350)
        setTimeout(() => setStage(2), 800)
        setTimeout(() => setStage(3), 1300)
      }
    }, 38)
    return () => clearInterval(interval)
  }, [])

  const words = ["Know", "exactly", "what", "to", "record", "before", "you", "start", "filming."]

  return (
    <section className="w-full relative min-h-[85vh] flex flex-col justify-center py-12 md:py-16 px-6 md:px-12 font-sans select-none overflow-hidden border-b border-[#8B5E3C]/15 bg-[#FAF7F2]">
      
      {/* Subtle Ambient Background Light Drift */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[550px] h-[350px] bg-gradient-to-tr from-[#8B5E3C]/15 via-[#F5DFC0]/30 to-[#A47551]/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="container mx-auto max-w-6xl grid lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* LEFT COLUMN: Word-by-Word Reveal & Magnetic CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF1E8] border border-[#8B5E3C]/20 text-[11px] font-extrabold text-[#8B5E3C]"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
            <span>Creative Planning Studio</span>
          </motion.div>

          {/* Staggered Word Reveal Headline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#3D2B1F] tracking-tight leading-[1.1] flex flex-wrap gap-x-2.5">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className={i >= 5 ? "brand-gradient-text inline-block" : "inline-block"}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base text-[#5C4033]/90 font-medium leading-relaxed max-w-lg"
          >
            Transform one raw idea into a complete, camera-ready shoot plan with hooks, scene timing, voiceover scripts, captions, and audio.
          </motion.p>

          {/* Magnetic CTA & Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 pt-1"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block"
            >
              <Button size="lg" asChild className="rounded-full font-bold text-sm h-13 px-8 bg-gradient-to-r from-[#8B5E3C] via-[#A47551] to-[#C48B5E] text-white shadow-lg hover:shadow-xl transition-all group">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                  Start Creating Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </Button>
            </motion.div>

            {/* Checklist */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] font-extrabold text-[#5C4033]/80">
              {["Storyboard", "Voiceover", "Captions", "Music", "Ready in under 30s"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#8B5E3C]/15 flex items-center justify-center text-[#8B5E3C]">
                    <CheckIcon className="h-2.5 w-2.5 stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN: Layered Floating Assembly Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="rounded-3xl border border-[#8B5E3C]/25 bg-[#FFF7F0] p-5 sm:p-6 shadow-xl space-y-4 text-left relative overflow-hidden">
            
            {/* Prompt Typing Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 animate-pulse text-amber-600" /> Concept Prompt
                </span>
                {stage > 0 && (
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                    ⚡ Generating...
                  </span>
                )}
              </div>

              <div className="bg-[#FAF7F2] border border-[#8B5E3C]/20 rounded-xl p-3 shadow-2xs">
                <span className="text-[#3D2B1F] font-bold text-xs font-mono">
                  “{typedText}”
                  <span className="inline-block w-1.5 h-3.5 bg-[#8B5E3C] ml-1 animate-pulse align-middle" />
                </span>
              </div>
            </div>

            {/* Animated Output Teaser */}
            <div className="space-y-2.5 pt-1">
              
              {/* Hook Teaser */}
              <AnimatePresence>
                {stage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="p-3 bg-[#FAF1E8] border border-[#8B5E3C]/25 rounded-xl space-y-0.5"
                  >
                    <span className="text-[9px] font-extrabold text-[#8B5E3C] uppercase tracking-widest block">
                      Hook (00:00 - 00:03)
                    </span>
                    <p className="text-[#3D2B1F] font-extrabold text-xs leading-snug">
                      “Stop starting your workday in panic mode. Here is the 10-min reset.”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scene 1 Snippet */}
              <AnimatePresence>
                {stage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-[#FAF7F2] border border-[#8B5E3C]/20 p-3 rounded-xl space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs font-bold text-[#3D2B1F]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-[#8B5E3C] text-white text-[10px] flex items-center justify-center">1</span>
                        Scene 1: Alarm Reset
                      </span>
                      <Badge variant="secondary" className="text-[9px] py-0 px-2">⏱ 3s</Badge>
                    </div>
                    <p className="text-[11px] text-[#5C4033] font-medium flex items-center gap-1">
                      <VideoCameraIcon className="h-3 w-3 text-[#8B5E3C]" /> Tap phone alarm, cut to sunrise window blinds.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Voiceover Snippet */}
              <AnimatePresence>
                {stage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="p-2.5 bg-[#FAF1E8]/80 border border-[#8B5E3C]/20 rounded-xl space-y-0.5 text-xs"
                  >
                    <span className="text-[9px] font-extrabold text-[#8B5E3C] uppercase tracking-wider block flex items-center gap-1">
                      <VoiceIcon className="h-3 w-3" /> Voiceover Line
                    </span>
                    <p className="font-extrabold text-[#3D2B1F] italic text-[11px]">
                      “Most productive days begin before everyone else wakes up.”
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
