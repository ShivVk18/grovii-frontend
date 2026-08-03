'use client'

import React from 'react'
import { Button } from '../ui/button'
import { HiArrowRight as ArrowRight, HiFilm as Film, HiCheckCircle as CheckCircle2, HiSparkles as Sparkles, HiSquare3Stack3D as Layers, HiAdjustmentsHorizontal as Sliders, HiMusicalNote as Music, HiDocumentText as FileText } from "react-icons/hi2"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
} as any

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as any

export default function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden py-16 md:py-28 select-none font-sans">

      {/* Ambient glow matching SignIn/SignUp */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#F5DFC0]/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#8B5E3C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto flex flex-col items-center text-center gap-10 px-6 md:px-12 relative z-10">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8 w-full max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5DFC0]/50 border border-[#8B5E3C]/20 text-xs font-semibold text-[#8B5E3C] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-pulse inline-block" />
              The Creative Studio for Short-Form Content
              <span className="text-[#8B5E3C]/40">•</span>
              <span className="text-[#3D2B1F] font-bold">Reels, TikToks & Shorts</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={item} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#3D2B1F] leading-[1.08]">
              Turn One Idea Into A <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5E3C] via-[#A0704C] to-[#5C4033]">
                Complete Video Plan
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={item}>
            <p className="text-base sm:text-lg md:text-xl text-[#5C4033]/90 max-w-2xl font-normal leading-relaxed">
              Go from a simple sentence to a camera-ready shoot plan in seconds. 
              Grovii prepares your <span className="text-[#3D2B1F] font-semibold">hooks, scene-by-scene breakdown, voiceover script, camera directions, music ideas,</span> and <span className="text-[#3D2B1F] font-semibold">social posts</span> automatically.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            <Button size="lg" asChild className="rounded-full font-bold text-sm h-13 px-8 shadow-xl bg-gradient-to-r from-[#8B5E3C] to-[#C48B5E] text-white hover:opacity-95 transition-all duration-300 w-full sm:w-auto group">
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                Start Studio Workspace
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full font-semibold text-sm h-13 px-8 border-[#8B5E3C]/20 text-[#3D2B1F] bg-[#FAF7F2] hover:bg-[#F5DFC0]/40 transition-all w-full sm:w-auto">
              <Link href="#demo" className="flex items-center justify-center gap-2">
                <Film className="h-4 w-4 text-[#8B5E3C]" />
                See Studio Demo
              </Link>
            </Button>
          </motion.div>

          {/* Outcome Transformation Cards (Before vs After) */}
          <motion.div variants={item} className="w-full max-w-4xl pt-10">
            <div className="p-6 md:p-8 rounded-3xl border border-[#8B5E3C]/20 bg-[#FFF7F0] shadow-2xl text-left space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#8B5E3C]/15">
                <span className="text-xs font-mono font-bold text-[#8B5E3C] uppercase tracking-widest">
                  Content Creation Transformation
                </span>
                <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-700 border-emerald-500/30 font-bold">
                  Ready to Shoot in 15s
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* BEFORE */}
                <div className="md:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#8B5E3C]/15 space-y-3">
                  <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-wider block">Before Grovii</span>
                  <div className="p-3 bg-[#FFF7F0] rounded-xl border border-[#8B5E3C]/10 text-xs font-medium text-[#3D2B1F]">
                    “I want to make a video about morning productivity routines for founders.”
                  </div>
                  <div className="text-[11px] text-[#5C4033]/70 italic">
                    ❌ Unstructured idea, no camera plan, writer’s block.
                  </div>
                </div>

                {/* ARROW */}
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5E3C] to-[#5C4033] text-[#FFF7F0] flex items-center justify-center shadow-lg">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>

                {/* AFTER */}
                <div className="md:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#8B5E3C]/30 shadow-md space-y-3">
                  <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-wider block">After Grovii (Complete Shoot Plan)</span>
                  <div className="space-y-2 text-xs font-semibold text-[#3D2B1F]">
                    <div className="flex items-center justify-between bg-[#FFF7F0] p-2.5 rounded-xl border border-[#8B5E3C]/10">
                      <span>✓ 3 Scroll-Stopping Hooks</span>
                      <span className="text-[10px] text-emerald-700 font-bold">Ready</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#FFF7F0] p-2.5 rounded-xl border border-[#8B5E3C]/10">
                      <span>✓ 4 Shot-by-Shot Scene Cards</span>
                      <span className="text-[10px] text-emerald-700 font-bold">13s Total</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#FFF7F0] p-2.5 rounded-xl border border-[#8B5E3C]/10">
                      <span>✓ Camera Movement & Lighting</span>
                      <span className="text-[10px] text-emerald-700 font-bold">Macro/POV</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#FFF7F0] p-2.5 rounded-xl border border-[#8B5E3C]/10">
                      <span>✓ Dialogue & Multi-Platform Post</span>
                      <span className="text-[10px] text-emerald-700 font-bold">LinkedIn/X</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
