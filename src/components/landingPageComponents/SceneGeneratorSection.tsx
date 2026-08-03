'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  HiCamera as Camera, 
  HiHandThumbUp as ThumbsUp, 
  HiHandThumbDown as ThumbsDown, 
  HiClock as Clock, 
  HiFilm as Film,
  HiVideoCamera as Video,
  HiDocumentText as FileText,
  HiSpeakerWave as Volume2
} from "react-icons/hi2"
import { Badge } from '../ui/badge'

const featureScenes = [
  {
    number: 1,
    title: 'Scene 1: Visual Hook',
    duration: 3,
    camera: 'Macro Extreme Close-Up (Fast Push-In)',
    lighting: 'Warm High-Contrast',
    transition: 'Whip Pan Cut',
    whatToFilm: 'Macro shot of fresh coffee dripping into a dark mug on a wooden desk. Sudden push-in focus on steam rising as hands set down a journal.',
    whatToSay: '“Stop waking up at 5 AM. Here is what top 1% founders actually do.”',
    dos: ['Keep lighting warm and focused', 'Use quick 3-second pacing'],
    donts: ['Do not show generic alarms', 'Avoid static camera angles']
  },
  {
    number: 2,
    title: 'Scene 2: Environment Setup',
    duration: 4,
    camera: 'Medium POV Shot (Handheld Steady)',
    lighting: 'Natural Morning Daylight',
    transition: 'Cut to Subject',
    whatToFilm: 'POV walking into a quiet home studio, turning phone face-down on a clean desk workspace. Digital timer starts at 90:00.',
    whatToSay: '“It is not about working 14 hours. It is about 90 minutes of ruthless focus.”',
    dos: ['Ensure phone flip is decisive', 'Keep workspace clean'],
    donts: ['Avoid background clutter', 'No ambient noise']
  },
  {
    number: 3,
    title: 'Scene 3: Execution & Proof',
    duration: 3,
    camera: 'Over-The-Shoulder (Subtle Dolly Right)',
    lighting: 'Soft Cool Studio LED',
    transition: 'Fade Out',
    whatToFilm: 'Subject marking three green checkmarks on a physical whiteboard dashboard. Camera dollies slowly right to capture marker glide.',
    whatToSay: '“Audit your high-energy hours and build your entire day around them.”',
    dos: ['Use bold green marker', 'Keep subject in frame right'],
    donts: ['Don’t obscure written text', 'Avoid dark shadows']
  }
]

export default function SceneGeneratorSection() {
  return (
    <section id="shots" className="py-24 relative overflow-hidden bg-secondary/20 border-t border-border/50 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-border text-xs font-bold text-foreground">
            <Video className="h-3.5 w-3.5 text-primary" /> Camera-Ready Scene Cards
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Know Exactly What to Film
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            No more guessing shot angles or stumbling over words. Every scene card tells you what to film, what to say, and how to frame the shot.
          </p>
        </div>

        {/* Scene Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featureScenes.map((scene) => (
            <motion.div
              key={scene.number}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl border border-border bg-card p-6 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-foreground text-background text-sm font-bold flex items-center justify-center shadow-md">
                      {scene.number}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{scene.title}</h3>
                      <span className="text-[10px] text-muted-foreground font-mono">Length: {scene.duration} Seconds</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold bg-secondary">
                    {scene.transition}
                  </Badge>
                </div>

                {/* What to Film */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Camera className="h-3 w-3 text-primary" /> What To Film
                  </span>
                  <p className="text-xs text-foreground font-medium leading-relaxed bg-secondary/40 p-3 rounded-xl border border-border/50">
                    {scene.whatToFilm}
                  </p>
                </div>

                {/* What to Say */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Volume2 className="h-3 w-3 text-emerald-500" /> What To Say (Voiceover)
                  </span>
                  <p className="text-xs font-bold text-foreground leading-relaxed italic bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/15">
                    {scene.whatToSay}
                  </p>
                </div>

                {/* Camera & Lighting Suggestion */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold pt-1">
                  <div className="bg-secondary/60 p-2.5 rounded-xl border border-border/50">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">Camera Setup</span>
                    <span className="text-foreground text-[11px] font-bold truncate block">{scene.camera}</span>
                  </div>
                  <div className="bg-secondary/60 p-2.5 rounded-xl border border-border/50">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">Lighting Vibe</span>
                    <span className="text-foreground text-[11px] font-bold truncate block">{scene.lighting}</span>
                  </div>
                </div>

                {/* Pro Tips (Do's and Don'ts) */}
                <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                  <div className="bg-emerald-500/5 border border-emerald-500/15 p-3 rounded-xl space-y-1 text-emerald-800 dark:text-emerald-400">
                    <span className="text-[9px] font-bold uppercase flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> Pro Tip</span>
                    <ul className="list-disc pl-3 text-[10px] space-y-0.5 font-medium">
                      {scene.dos.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/15 p-3 rounded-xl space-y-1 text-rose-800 dark:text-rose-400">
                    <span className="text-[9px] font-bold uppercase flex items-center gap-1"><ThumbsDown className="h-3 w-3" /> Avoid</span>
                    <ul className="list-disc pl-3 text-[10px] space-y-0.5 font-medium">
                      {scene.donts.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
