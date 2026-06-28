'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Flame, Sparkles, Play, Layers, Film } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const HeroSection = () => {
  return (
    <section className="w-full relative overflow-hidden py-24 md:py-36 select-none">

      {/* ── Ambient background blobs ── */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[520px] bg-gradient-to-br from-[#F5DFC0]/50 via-[#FAF1E8]/40 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-24 w-72 h-72 bg-[#8B5E3C]/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/15 rounded-full blur-[80px] pointer-events-none" />

      {/* ── Subtle grid overlay ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto flex flex-col items-center text-center gap-10 px-6 md:px-12 relative z-10">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-10 w-full"
        >
          {/* Proof badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#8B5E3C]/12 shadow-md text-xs font-bold text-[#8B5E3C]">
              <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-pulse inline-block" />
              The AI Reel Studio for High-Growth Creators
              <Sparkles className="h-3.5 w-3.5 opacity-70" />
            </div>
          </motion.div>

          {/* Headlines */}
          <motion.div variants={item} className="max-w-4xl space-y-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-[#3D2B1F]">
              Turn your{' '}
              <span className="brand-gradient-text">ideas</span>{' '}
              into ready-to-shoot
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="brand-gradient-text">Reels</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8B5E3C]/40 to-transparent rounded-full origin-left"
                />
              </span>{' '}
              in seconds
            </h1>

            <p className="text-[#7A5C45]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Create, customize, and generate scroll-stopping video scripts with AI — all in one
              visual workspace designed for creators who want speed and quality.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="rounded-full brand-gradient text-white px-9 py-6 font-extrabold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 gap-2"
            >
              <Link href="/dashboard">
                <Flame className="h-4 w-4" />
                Get Started Free
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full border-[#8B5E3C]/25 text-[#8B5E3C] bg-white hover:bg-[#8B5E3C]/5 hover:border-[#8B5E3C]/40 px-9 py-6 font-extrabold text-sm transition-all duration-300 gap-2"
            >
              <a href="#how-it-works">
                <Play className="h-4 w-4 fill-[#8B5E3C]/20" />
                See How It Works
              </a>
            </Button>
          </motion.div>

          {/* Social proof strip */}
          <motion.div variants={item} className="flex items-center gap-3 text-xs font-semibold text-[#7A5C45]/70">
            <div className="flex -space-x-2">
              {['🎨', '🎬', '📱', '✨'].map((emoji, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FAF1E8] to-[#F5DFC0] border-2 border-white flex items-center justify-center text-[11px] shadow-sm">
                  {emoji}
                </div>
              ))}
            </div>
            <span>Loved by <strong className="text-[#8B5E3C]">1,200+</strong> creators worldwide</span>
          </motion.div>

          {/* Product mockup */}
          <motion.div
            variants={item}
            className="w-full max-w-5xl rounded-[28px] border border-[#8B5E3C]/12 bg-white/50 p-3 md:p-5 shadow-2xl shadow-[#8B5E3C]/8 relative overflow-hidden backdrop-blur-md"
          >
            {/* Glow overlay */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F5DFC0]/30 rounded-full blur-[80px] pointer-events-none" />

            {/* Inner workspace */}
            <div className="rounded-[20px] border border-[#8B5E3C]/8 bg-[#FAF7F2] overflow-hidden flex flex-col h-[360px] md:h-[460px] shadow-inner relative">

              {/* Mock toolbar */}
              <div className="h-11 bg-white/90 border-b border-[#8B5E3C]/8 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="text-[10px] text-[#8B5E3C]/60 font-bold ml-3">Morning Routine Reel · Grovii Studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200/60">AI Generated ✓</span>
                  <div className="w-6 h-6 rounded-full brand-gradient border-2 border-white shadow-sm" />
                </div>
              </div>

              {/* Mock body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Icon dock */}
                <div className="w-12 bg-white/60 border-r border-[#8B5E3C]/8 flex flex-col items-center py-4 gap-3 shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-[#8B5E3C]/10 text-[#8B5E3C] flex items-center justify-center shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#8B5E3C]/40 flex items-center justify-center">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#8B5E3C]/40 flex items-center justify-center">
                    <Film className="h-4 w-4" />
                  </div>
                </div>

                {/* Params panel */}
                <div className="w-48 bg-[#FDFBF8] border-r border-[#8B5E3C]/8 p-3 hidden sm:flex flex-col text-left space-y-4 shrink-0">
                  <span className="text-[9px] font-bold text-[#8B5E3C]/50 uppercase tracking-wider">Brief Parameters</span>
                  <div className="space-y-1.5">
                    <div className="h-2 w-16 bg-[#8B5E3C]/10 rounded" />
                    <div className="h-9 bg-white border border-[#8B5E3C]/12 rounded-xl p-2 text-[10px] text-[#5C4033] font-bold leading-snug">5 AM morning routine...</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-10 bg-[#8B5E3C]/10 rounded" />
                    <div className="h-7 bg-white border border-[#8B5E3C]/12 rounded-lg px-2 flex items-center text-[10px] text-[#8B5E3C] font-semibold">✦ Inspire</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-12 bg-[#8B5E3C]/10 rounded" />
                    <div className="h-7 bg-white border border-[#8B5E3C]/12 rounded-lg px-2 flex items-center text-[10px] text-[#8B5E3C] font-semibold">Cinematic Cut</div>
                  </div>
                  <div className="pt-1 mt-auto">
                    <div className="w-full h-8 rounded-full brand-gradient flex items-center justify-center text-white text-[10px] font-extrabold shadow-md gap-1">
                      <Sparkles className="h-3 w-3" /> Generate
                    </div>
                  </div>
                </div>

                {/* Canvas area */}
                <div className="flex-1 bg-[#F8F4EE] p-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,94,60,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  {/* 9:16 Phone Mockup */}
                  <div className="w-[155px] aspect-[9/16] bg-zinc-900 rounded-[26px] shadow-xl border-[6px] border-zinc-950 overflow-hidden relative flex flex-col justify-end p-3 z-10 shrink-0">
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-zinc-950 rounded-full z-20" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#3E2723] via-[#4E342E] to-[#5D4037] flex flex-col justify-end p-3">
                      <div className="absolute inset-x-2 top-7 bottom-16 rounded-xl bg-white/8 border border-white/5 flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-[7px] bg-[#8B5E3C] text-white px-1.5 py-0.5 rounded-full font-bold mb-1.5">Close Up</span>
                        <p className="text-white font-bold text-[8px] leading-snug">The Silent Alarm</p>
                        <p className="text-white/60 text-[6.5px] leading-normal mt-1 line-clamp-2">Sunlight filtering through the blinds at 5 AM...</p>
                      </div>
                      <div className="w-full bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/8 text-center">
                        <p className="text-white font-bold text-[7px] leading-tight">"At 5:00 AM, the world is quiet. But your goals aren't."</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating scene card */}
                  <div className="absolute right-4 top-6 w-44 rounded-2xl bg-white/95 border border-[#8B5E3C]/12 shadow-xl p-3 text-left space-y-2 hidden md:block">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-lg brand-gradient text-white text-[9px] font-bold flex items-center justify-center shadow-sm">1</span>
                      <span className="text-[9px] font-extrabold text-[#5C4033]">Scene Controls</span>
                    </div>
                    <div className="h-1 w-24 bg-[#8B5E3C]/12 rounded-full" />
                    <div className="bg-[#FAF1E8] border border-[#8B5E3C]/10 rounded-xl p-2 text-[8px] text-[#5C4033] leading-relaxed font-medium">
                      "At 5:00 AM, the world is quiet. But your goals aren't."
                    </div>
                    <div className="flex gap-1 pt-1">
                      <span className="text-[8px] font-bold text-[#8B5E3C] bg-[#8B5E3C]/8 px-2 py-0.5 rounded-full">Energetic</span>
                      <span className="text-[8px] font-bold text-[#8B5E3C] bg-[#8B5E3C]/8 px-2 py-0.5 rounded-full">3s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="h-14 bg-white/80 border-t border-[#8B5E3C]/8 px-4 flex items-center gap-2.5 overflow-x-auto shrink-0">
                {[
                  { label: 'Scene 1 · 3s', title: 'The Silent Alarm', active: true },
                  { label: 'Scene 2 · 4s', title: 'First Light Move', active: false },
                  { label: 'Scene 3 · 4s', title: 'Fueling the Mind', active: false },
                ].map((s, i) => (
                  <div key={i} className={`min-w-[100px] h-9 rounded-xl p-1.5 text-left flex flex-col justify-between shrink-0 border ${
                    s.active
                      ? 'bg-[#FAF1E8] border-[#8B5E3C]/30'
                      : 'bg-[#FDFBF8] border-[#8B5E3C]/8'
                  }`}>
                    <span className={`text-[7px] font-bold ${s.active ? 'text-[#8B5E3C]' : 'text-[#8B5E3C]/40'}`}>{s.label}</span>
                    <span className="text-[8px] font-extrabold text-[#5C4033] truncate">{s.title}</span>
                  </div>
                ))}
                <div className="min-w-[80px] h-9 border border-dashed border-[#8B5E3C]/25 rounded-xl flex items-center justify-center text-[#8B5E3C] text-[9px] font-bold shrink-0 hover:bg-[#8B5E3C]/5 transition-colors cursor-pointer">
                  + Add Scene
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
