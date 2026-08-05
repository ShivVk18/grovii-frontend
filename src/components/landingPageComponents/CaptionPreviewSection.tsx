'use client'

import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  HiBookOpen as BookOpen,
  HiCheck as Check,
  HiDocumentDuplicate as Copy,
  HiSparkles as Sparkles
} from 'react-icons/hi2'

export default function CaptionPreviewSection() {
  const [copied, setCopied] = useState(false)
  const captionText = "Small morning habits compound into peaceful days. Try this 10-minute routine tomorrow and notice how much quieter your mind feels before work. ☕✨\n\n#MorningRoutine #MindfulProductivity #MorningVibes #FocusRoutine"

  const handleCopy = () => {
    navigator.clipboard.writeText(captionText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="captions" className="w-full py-20 bg-background relative font-sans select-none border-b border-border/60">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-4xl space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-primary/5 rounded-full px-3.5 py-1">
            Post Captions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            High-Engagement Social Captions
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Formatted copy complete with relevant hashtags ready to post.
          </p>
        </div>

        {/* SINGLE CAPTION CARD PREVIEW */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="glass-panel border border-border p-6 rounded-3xl bg-card shadow-xl space-y-4 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-border/60">
              <span className="text-[11px] font-extrabold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> Option 1 • Mindful Tone
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 text-xs font-bold text-primary hover:text-primary/80 bg-secondary/50 rounded-xl gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Caption"}
              </Button>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-foreground leading-relaxed select-text whitespace-pre-wrap">
              {captionText}
            </p>
          </div>

          {/* Teaser Label */}
          <div className="text-center pt-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border text-xs font-extrabold text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              +2 more caption options generated
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
