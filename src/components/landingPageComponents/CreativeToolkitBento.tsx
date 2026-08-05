'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
  FaTwitter as Twitter,
  FaYoutube as Youtube
} from 'react-icons/fa6'
import {
  HiChatBubbleBottomCenterText as VoiceIcon,
  HiMusicalNote as MusicIcon,
  HiShare as ShareIcon,
  HiPlay as PlayIcon,
  HiPause as PauseIcon
} from 'react-icons/hi2'

export default function CreativeToolkitBento() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <section id="toolkit" className="w-full py-16 md:py-20 bg-[#FFF7F0] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/15">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Integrated Bento Studio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            All creative tools in one shoot plan.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium">
            Voiceovers, social captions, trending audio, and multi-platform versions generated together.
          </p>
        </div>

        {/* HANDCRAFTED BENTO GRID WITH MAGNETIC HOVER PHYSICS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left max-w-5xl mx-auto">
          
          {/* BENTO CARD 1: VOICEOVER SCRIPT (5 cols) */}
          <motion.div
            whileHover={{ y: -6, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-5 rounded-3xl border border-[#8B5E3C]/20 bg-[#FAF7F2] p-5 shadow-lg space-y-4 -rotate-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#8B5E3C]/15">
                <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                  <VoiceIcon className="h-3.5 w-3.5" /> 🗣 Teleprompter Script
                </span>
                <Badge variant="secondary" className="text-[9px] py-0 px-2 bg-[#FAF1E8]">Active Line</Badge>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#3D2B1F]">
                <p className="opacity-40">“Stop starting your workday in panic mode.”</p>
                <div className="p-2.5 rounded-xl bg-[#FFF7F0] border border-[#8B5E3C]/30 font-bold shadow-2xs">
                  “Step one: 500ml cold water before touch any phone notifications.”
                  <span className="inline-block w-1.5 h-3.5 bg-[#8B5E3C] ml-1 animate-pulse align-middle" />
                </div>
                <p className="opacity-40">“Step two: Write top 3 non-negotiables in notebook.”</p>
              </div>
            </div>

            <p className="text-[11px] text-[#5C4033]/80 font-medium italic pt-2 border-t border-[#8B5E3C]/10">
              💡 Read smoothly while your smartphone camera records.
            </p>
          </motion.div>

          {/* BENTO CARD 2: MORPHING CAPTIONS (7 cols) */}
          <motion.div
            whileHover={{ y: -6, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-7 rounded-3xl border border-[#8B5E3C]/20 bg-[#FFF7F0] p-5 shadow-lg space-y-3 rotate-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#8B5E3C]/15">
                <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                  <Instagram className="h-3.5 w-3.5 text-[#E1306C]" /> Morphing Social Copy
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-500/15 px-2 py-0.5 rounded-full">Auto Format</span>
              </div>

              <p className="text-xs font-semibold text-[#3D2B1F] leading-relaxed">
                “Small morning habits compound into peaceful days. Try this 10-minute routine tomorrow and notice how quiet your mind feels before work. ☕✨”
              </p>
            </div>

            <div className="pt-2 border-t border-[#8B5E3C]/10 flex items-center justify-between text-[11px] font-mono text-[#8B5E3C]">
              <span>#MorningRoutine #Focus #Habits</span>
              <span className="text-[10px] font-sans font-bold text-[#5C4033]/70">Adapts for IG, LinkedIn, X, YT</span>
            </div>
          </motion.div>

          {/* BENTO CARD 3: SPOTIFY MUSIC MATCH (7 cols) */}
          <motion.div
            whileHover={{ y: -6, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-7 rounded-3xl border border-[#8B5E3C]/20 bg-[#3D2B1F] text-white p-5 shadow-lg space-y-3 -rotate-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <MusicIcon className="h-3.5 w-3.5" /> 🎵 Audio Synchronization
              </span>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">Top 1% Viral</span>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isPlaying ? [0, 2, -2, 0] : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B5E3C] to-[#C48B5E] text-xl flex items-center justify-center shadow-xs shrink-0"
              >
                🎹
              </motion.div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-black text-white truncate">Golden Hour — JVKE</h4>
                <p className="text-[11px] text-amber-200/80 font-medium">Sweeping piano swell matches sunrise hydration shot.</p>
              </div>

              {/* Animated Waveform Equalizer */}
              <div className="flex items-center gap-0.5 h-5 px-1">
                {[40, 90, 30, 100, 60, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? { height: ["20%", `${h}%`, "20%"] } : { height: "30%" }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: i * 0.08 }}
                    className="w-1 bg-amber-400 rounded-full"
                  />
                ))}
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                className="w-8 h-8 rounded-full bg-amber-400 text-[#3D2B1F] flex items-center justify-center shadow-xs shrink-0 hover:scale-105 transition-transform"
              >
                {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4 ml-0.5" />}
              </button>
            </div>
          </motion.div>

          {/* BENTO CARD 4: REPURPOSE NODES (5 cols) */}
          <motion.div
            whileHover={{ y: -6, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="md:col-span-5 rounded-3xl border border-[#8B5E3C]/20 bg-[#FAF7F2] p-5 shadow-lg space-y-3 rotate-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#8B5E3C]/15">
                <span className="text-[10px] font-extrabold text-[#8B5E3C] uppercase tracking-widest flex items-center gap-1.5">
                  <ShareIcon className="h-3.5 w-3.5" /> 🚀 Multi-Platform
                </span>
              </div>

              <p className="text-xs font-bold text-[#3D2B1F]">
                1 Core Shoot Plan → Formatted for 4 Networks
              </p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-xl bg-[#FFF7F0] border border-[#8B5E3C]/15 flex items-center justify-center"><Instagram className="h-4 w-4 text-[#E1306C]" /></motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-xl bg-[#FFF7F0] border border-[#8B5E3C]/15 flex items-center justify-center"><Linkedin className="h-4 w-4 text-[#0A66C2]" /></motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-xl bg-[#FFF7F0] border border-[#8B5E3C]/15 flex items-center justify-center"><Twitter className="h-4 w-4 text-[#3D2B1F]" /></motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="p-2 rounded-xl bg-[#FFF7F0] border border-[#8B5E3C]/15 flex items-center justify-center"><Youtube className="h-4 w-4 text-[#FF0000]" /></motion.div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
