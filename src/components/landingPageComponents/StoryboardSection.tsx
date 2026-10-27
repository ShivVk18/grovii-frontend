'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '../ui/badge'
import {
  HiVideoCamera as CameraIcon,
  HiSpeakerWave as VoiceIcon,
  HiLightBulb as LightBulbIcon,
  HiFilm as FilmIcon,
  HiDocumentText as ScriptIcon,
  HiListBullet as ListIcon,
  HiMusicalNote as MusicIcon
} from 'react-icons/hi2'

export default function StoryboardSection() {
  const [activePreviewTab, setActivePreviewTab] = useState<'scenes' | 'script' | 'shotlist'>('scenes')

  return (
    <section id="preview" className="w-full py-20 bg-background border-b border-border font-sans select-none">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl space-y-10 text-center">
        
        <div className="space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-[10px] font-extrabold uppercase tracking-widest text-primary border-primary/20 bg-secondary rounded-full px-3 py-1">
            Production Workspace Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            A production studio built for creators
          </h2>
          <p className="text-sm text-muted-foreground font-medium max-w-lg mx-auto">
            Switch seamlessly between scene cards, teleprompter scripts, and filming checklists.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2">
          {[
            { id: 'scenes', label: 'Scene Timeline', icon: FilmIcon },
            { id: 'script', label: 'Teleprompter Script', icon: ScriptIcon },
            { id: 'shotlist', label: 'Filming Checklist', icon: ListIcon },
          ].map((t) => {
            const Icon = t.icon
            const isActive = activePreviewTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActivePreviewTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Preview Canvas */}
        <div className="max-w-3xl mx-auto text-left">
          
          {activePreviewTab === 'scenes' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Scene Card 1 */}
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 space-y-4 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-primary text-primary-foreground font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      Scene 1: The Alarm Reality
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold">
                    ⏱ 3s · Eye Level
                  </span>
                </div>

                {/* What to record */}
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <CameraIcon className="h-3.5 w-3.5 text-primary" /> What to Record
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">
                    Over-the-shoulder shot reaching for your phone on the nightstand, with warm morning daylight filtering through the blinds.
                  </p>
                </div>

                {/* Voiceover */}
                <div className="p-4 rounded-2xl bg-card border border-border space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <VoiceIcon className="h-3.5 w-3.5 text-primary" /> Spoken Voiceover
                  </span>
                  <p className="text-sm font-bold text-foreground italic">
                    “The biggest mistake creators make isn't editing—it's filming without a clear hook.”
                  </p>
                </div>

                {/* Tip */}
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 border border-primary/15 p-3 rounded-xl">
                  <LightBulbIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-foreground">Director Tip:</strong> Keep the first movement swift to trigger a visual pattern interrupt.
                  </p>
                </div>
              </div>

              {/* Next Scenes Teaser */}
              <div className="p-4 rounded-2xl border border-dashed border-border bg-card/60 text-center text-xs font-bold text-muted-foreground">
                + 4 more sequential scenes generated with camera cuts and on-screen text
              </div>
            </motion.div>
          )}

          {activePreviewTab === 'script' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Full Voiceover Script (60s)
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  145 words · 130 WPM pacing
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium text-foreground leading-loose select-text bg-secondary/30 p-5 rounded-2xl border border-border/60">
                “Stop waking up early just to scroll on your phone. Here are 3 habits that doubled my output as a solo creator.<br /><br />
                First: Lock in your 90-minute focus block before checking your email or notifications.<br /><br />
                Second: Never film without a storyboard. Having a shot list cuts shooting time from 3 hours to 20 minutes.<br /><br />
                Third: Batch your hooks first. Comment 'GROW' below and I'll send you my exact framework.”
              </p>
            </motion.div>
          )}

          {activePreviewTab === 'shotlist' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-6 space-y-3 shadow-sm"
            >
              <div className="pb-3 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
                On-Set Filming Checklist
              </div>
              {[
                { num: 1, dur: "3s", shot: "Macro phone pickup on nightstand", angle: "Handheld close-up" },
                { num: 2, dur: "8s", shot: "Walking to standing desk, turning on monitor", angle: "Wide tracking shot" },
                { num: 3, dur: "12s", shot: "Talking directly into camera with clear mic framing", angle: "Eye level 35mm" },
                { num: 4, dur: "7s", shot: "Quick B-roll montage typing on keyboard", angle: "Top-down overhead" }
              ].map((s) => (
                <div key={s.num} className="p-3.5 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-foreground">Shot #{s.num}</span>
                    <span className="font-semibold text-foreground">{s.shot}</span>
                  </div>
                  <span className="text-muted-foreground font-medium shrink-0">
                    {s.dur} · {s.angle}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

        </div>

      </div>
    </section>
  )
}
