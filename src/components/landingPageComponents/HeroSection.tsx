'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  HiArrowRight as ArrowRight,
  HiSparkles as Sparkles,
  HiVideoCamera as VideoCameraIcon,
  HiChatBubbleBottomCenterText as VoiceIcon
} from 'react-icons/hi2'

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("I want to make a Reel about productivity routines.")
  const [isGenerated, setIsGenerated] = useState(true)

  return (
    <section className="w-full relative pt-20 pb-28 font-sans select-none overflow-hidden">
      {/* Subtle Warm Backdrop Orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center space-y-14 relative z-10">
        
        {/* Editorial Linear / Apple Style Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
            <span>Creative Planning Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tight leading-[1.08]">
            Know exactly what to record <br className="hidden sm:inline" />
            <span className="brand-gradient-text">
              before you start filming.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            Describe one raw idea. Grovii generates your hooks, scene-by-scene storyboard, camera directions, voiceover script, captions, and music recommendations.
          </p>

          <div className="pt-2">
            <Button size="lg" asChild className="rounded-full font-bold text-base h-14 px-9 brand-gradient text-white shadow-xl hover:opacity-95 transition-all">
              <Link href="/dashboard" className="flex items-center gap-2.5">
                Start Creating
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Minimal Interactive Prompt Teaser */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="glass-panel rounded-3xl border border-border p-6 sm:p-8 bg-card/80 shadow-2xl max-w-3xl mx-auto space-y-6 text-left"
        >
          {/* Input Box */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block">
              Describe Your Idea
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. I want to make a Reel about productivity routines."
                className="flex-1 bg-secondary/40 border border-border rounded-2xl px-4 py-3.5 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <Button
                onClick={() => setIsGenerated(true)}
                className="rounded-2xl font-bold text-xs px-7 py-3.5 brand-gradient text-white shadow-xs"
              >
                Plan Video
              </Button>
            </div>
          </div>

          {/* Minimal 3-Part Teaser Output */}
          <AnimatePresence>
            {isGenerated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pt-4 border-t border-border/60 space-y-4"
              >
                {/* 1. Hook Line */}
                <div className="p-4.5 bg-primary/5 border border-primary/20 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">
                    Opening Hook (First 3 Seconds)
                  </span>
                  <p className="text-foreground font-extrabold text-base sm:text-lg leading-snug">
                    “Stop starting your workday in panic mode. Here is the 10-minute routine that saved my focus.”
                  </p>
                </div>

                {/* 2. One Storyboard Card Teaser */}
                <div className="bg-card border border-border p-4.5 rounded-2xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">1</span>
                      Scene 1: The Morning Reset
                    </span>
                    <Badge variant="secondary" className="text-[10px] font-bold py-0.5 px-2.5">⏱ 3 sec</Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="bg-secondary/40 p-3 rounded-xl border border-border/40">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
                        <VideoCameraIcon className="h-3 w-3 text-primary" /> 🎥 What to Show
                      </span>
                      <p className="text-foreground font-medium mt-0.5">Pouring cold water into a glass near sunlight.</p>
                    </div>
                    <div className="bg-primary/5 p-3 rounded-xl border border-primary/20">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider block flex items-center gap-1">
                        <VoiceIcon className="h-3 w-3 text-primary" /> 🗣 Voiceover Line
                      </span>
                      <p className="text-foreground font-bold italic mt-0.5">“Step one: 500ml water before phone notifications.”</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
