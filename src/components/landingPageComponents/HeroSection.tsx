'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
  HiArrowRight as ArrowRight,
  HiSparkles as Sparkles,
  HiVideoCamera as CameraIcon,
  HiSpeakerWave as VoiceIcon,
  HiClock as ClockIcon,
  HiFilm as FilmIcon,
  HiCheck as CheckIcon
} from 'react-icons/hi2'

export default function HeroSection() {
  const [ideaText, setIdeaText] = useState('')
  const targetIdea = '5 habits that doubled my output as a solo creator...'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= targetIdea.length) {
        setIdeaText(targetIdea.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full relative min-h-[85vh] flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 font-sans select-none overflow-hidden bg-background">
      
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary text-xs font-bold text-primary border border-border">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>The AI Pre-Production Studio for Creators</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              Turn your ideas into videos you <span className="text-primary italic">actually</span> want to shoot.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
              No more blank-page anxiety. Grovii acts as your personal AI Director—turning raw concepts into viral hooks, scene-by-scene shoot plans, camera angles, and voiceover scripts.
            </p>
          </div>

          {/* Workflow Sequence Badges */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-muted-foreground pt-1">
            <span className="text-foreground">Workflow:</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground">Idea</span>
            <span>➔</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground">Hook</span>
            <span>➔</span>
            <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground">Script</span>
            <span>➔</span>
            <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold">Ready to Shoot</span>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <Button
              size="lg"
              asChild
              className="rounded-2xl h-12 px-7 bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 gap-2"
            >
              <Link href="/dashboard/create">
                <span>Start Directing Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-2xl h-12 px-6 border-border text-foreground hover:bg-secondary text-sm font-semibold"
            >
              <Link href="#preview">
                See Live Preview
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5"><CheckIcon className="h-4 w-4 text-primary" /> Free 3 Shoot Plans / mo</span>
            <span className="flex items-center gap-1.5"><CheckIcon className="h-4 w-4 text-primary" /> No credit card required</span>
          </div>

        </div>

        {/* Right Column: Live Interactive Mockup */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl space-y-4 relative">
            
            {/* Mockup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Grovii Studio · 60s Reel
              </span>
            </div>

            {/* Prompt Mockup Input */}
            <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border text-xs space-y-1">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                Input Idea
              </span>
              <p className="font-semibold text-foreground min-h-[1.5rem]">
                {ideaText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            {/* Output Hook */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  Generated Hook (0:00 - 0:03)
                </span>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-primary/30 text-primary">
                  High Retention
                </Badge>
              </div>
              <p className="text-xs font-bold text-foreground">
                “Stop waking up at 5 AM just to scroll. Here are 3 habits that actually double your creator output.”
              </p>
            </div>

            {/* Output Scene Card 1 */}
            <div className="p-4 rounded-2xl bg-card border border-border space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-primary text-primary-foreground font-black text-[10px] flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs font-bold text-foreground">Scene 1: The Wakeup Trap</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-medium">3 sec · Eye Level</span>
              </div>

              <div className="space-y-1 bg-secondary/40 p-2.5 rounded-xl text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  What to Record
                </span>
                <p className="text-foreground font-medium">
                  Sitting at desk, reaching for phone in dim lighting, then shaking head directly at camera.
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  Voiceover
                </span>
                <p className="font-semibold text-foreground italic">
                  “Most creators fail before 9 AM because of this one mistake...”
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  )
}
