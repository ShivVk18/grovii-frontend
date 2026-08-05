'use client'

import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  HiClock as Clock,
  HiCheck as Check,
  HiDocumentDuplicate as Copy,
  HiLightBulb as LightBulbIcon,
  HiVideoCamera as VideoCameraIcon,
  HiChatBubbleBottomCenterText as VoiceIcon,
  HiSparkles as Sparkles
} from 'react-icons/hi2'

export default function StoryboardPreviewSection() {
  const [copied, setCopied] = useState(false)
  const voiceoverText = "Most productive days begin before everyone else wakes up."

  const handleCopy = () => {
    navigator.clipboard.writeText(voiceoverText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="storyboard" className="w-full py-24 bg-background relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Camera-Directed Storyboard
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Know What to Record, Scene by Scene
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Every scene card provides visual cues, voiceover lines, and camera directions.
          </p>
        </div>

        {/* SINGLE SCENE CARD PREVIEW */}
        <div className="space-y-5">
          <div className="glass-panel border border-primary/30 rounded-3xl overflow-hidden bg-card p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-border/60">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground text-sm font-black">
                  1
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-foreground">
                    Scene 1: Morning Routine Reset
                  </h3>
                  <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3 w-3 text-primary" /> ⏱ 3 sec • <span className="text-primary font-bold">Relatable & Calm</span>
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold py-1 px-3 rounded-full">
                ⏱ 3 sec
              </Badge>
            </div>

            {/* 🎥 What to Record */}
            <div className="bg-secondary/40 p-4.5 rounded-2xl border border-border/50 space-y-1">
              <span className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                <VideoCameraIcon className="h-4 w-4 text-primary" /> 🎥 What to Record
              </span>
              <p className="text-sm font-medium text-foreground select-text">
                Show yourself turning off your phone alarm on your bedside table, transitioning to opening blinds.
              </p>
            </div>

            {/* 🗣 Voiceover Example */}
            <div className="bg-primary/5 p-4.5 rounded-2xl border border-primary/20 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-2">
                  <VoiceIcon className="h-4 w-4 text-primary" /> 🗣 Voiceover Example
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 text-xs font-bold text-muted-foreground hover:text-primary rounded-full px-2.5"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="text-base font-extrabold text-foreground italic select-text">
                “{voiceoverText}”
              </p>
            </div>

            {/* 💡 Tip */}
            <div className="bg-amber-500/5 border border-amber-500/20 p-4.5 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <LightBulbIcon className="h-4 w-4" /> 💡 Shooting Tip
              </span>
              <p className="text-xs font-semibold text-foreground select-text">
                Use natural side morning light and keep camera steady at eye level.
              </p>
            </div>

          </div>

          {/* Minimal Teaser Label */}
          <div className="text-center pt-2">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/80 border border-border text-xs font-extrabold text-muted-foreground shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              +4 more scenes generated automatically in your shoot plan
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
