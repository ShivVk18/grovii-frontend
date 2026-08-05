'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiMusicalNote as Music,
  HiPlay as PlayIcon,
  HiPause as PauseIcon
} from 'react-icons/hi2'

const tracks = [
  { title: "Golden Hour", artist: "JVKE", mood: "Aesthetic Piano", emoji: "🎹", why: "Sweeping piano swell aligns with morning sunlight shots." },
  { title: "Until I Found You", artist: "Stephen Sanchez", mood: "Vintage Warmth", emoji: "🎸", why: "Retro acoustic warmth enhances mindful notebook focus." },
  { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", mood: "Soulful Vocals", emoji: "🎤", why: "Dynamic vocal crescendo brings high emotional resonance." },
  { title: "Heat Waves", artist: "Glass Animals", mood: "Upbeat Flow", emoji: "🌊", why: "Upbeat tempo ideal for quick cuts across movement." }
]

export default function MusicSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % tracks.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [isPlaying])

  const track = tracks[activeIdx]

  return (
    <section id="music" className="w-full py-16 md:py-20 bg-[#FAF7F2] relative font-sans select-none overflow-hidden border-b border-[#8B5E3C]/20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-10 relative z-10 text-center">
        
        {/* Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B5E3C] border-[#8B5E3C]/20 bg-[#FAF1E8] rounded-full px-3.5 py-1">
            Floating Audio Player
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-[#3D2B1F] tracking-tight">
            Trending audio, synchronized.
          </h2>
          <p className="text-sm text-[#5C4033]/80 font-medium max-w-xl mx-auto">
            Grovii matches your shoot plan with real trending audios that boost virality.
          </p>
        </div>

        {/* FLOATING SPOTIFY PLAYER (NO GIANT RECTANGLE) */}
        <div className="max-w-xl mx-auto space-y-6">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="inline-flex items-center gap-4 p-4 pr-6 rounded-full border-2 border-[#8B5E3C]/30 bg-[#FFF7F0] shadow-xl text-left relative"
            >
              {/* Circular Album Artwork */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#8B5E3C] to-[#C48B5E] text-2xl flex items-center justify-center shadow-md shrink-0">
                {track.emoji}
              </div>

              {/* Track Metadata */}
              <div className="overflow-hidden flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-[#3D2B1F] truncate">
                    {track.title}
                  </h3>
                  <Badge variant="secondary" className="text-[9px] font-bold bg-[#FAF1E8] text-[#8B5E3C]">
                    📈 Viral
                  </Badge>
                </div>
                <p className="text-xs font-bold text-[#8B5E3C]">by {track.artist}</p>
              </div>

              {/* Equalizer Bar Animation */}
              <div className="flex items-center gap-0.5 h-5 px-2">
                {[50, 90, 30, 100, 60, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? { height: ["20%", `${h}%`, "20%"] } : { height: "30%" }}
                    transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", delay: i * 0.08 }}
                    className="w-1 bg-[#8B5E3C] rounded-full"
                  />
                ))}
              </div>

              {/* Circular Play Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform shrink-0"
              >
                {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5 ml-0.5" />}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Track Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {tracks.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  activeIdx === idx
                    ? "bg-[#8B5E3C] text-white shadow-xs"
                    : "bg-[#FAF1E8] text-[#5C4033] hover:bg-[#F5DFC0]/50 border border-[#8B5E3C]/20"
                }`}
              >
                🎵 {t.title}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
