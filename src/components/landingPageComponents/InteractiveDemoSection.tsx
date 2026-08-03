'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HiFilm as Clapperboard, 
  HiSparkles as Sparkles, 
  HiDocumentDuplicate as Copy, 
  HiCheck as Check, 
  HiDevicePhoneMobile as Smartphone, 
  HiCamera as Film, 
  HiSquare3Stack3D as Layers, 
  HiAdjustmentsHorizontal as Sliders, 
  HiShare as Share2, 
  HiPlay as Play, 
  HiArrowDownTray as Download,
  HiInformationCircle as Info,
  HiHandThumbUp as ThumbsUp,
  HiHandThumbDown as ThumbsDown,
  HiMusicalNote as Music,
  HiArrowTrendingUp as TrendingUp,
  HiChevronRight as ChevronRight
} from "react-icons/hi2"
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const demoScenes = [
  {
    id: 1,
    number: 1,
    title: 'The Pattern Interrupt Hook',
    duration: 3,
    cameraAngle: 'Extreme Close Up',
    cameraMovement: 'Fast Push-in',
    lighting: 'Moody High-Contrast Warm',
    transition: 'Whip Pan Cut',
    dialogue: 'Stop waking up at 5 AM. Here is what top 1% founders actually do.',
    visual: 'Tight Macro shot on a steaming cup of dark espresso on a dark wood desk. Sudden push-in focus on steam rising.',
    broll: 'Hands opening a black leather journal.',
    dos: ['Keep lighting warm', 'Use fast camera whip pan'],
    donts: ['Do not show generic alarms', 'Avoid slow pans']
  },
  {
    id: 2,
    number: 2,
    title: 'The Deep Work Myth',
    duration: 4,
    cameraAngle: 'Medium POV Shot',
    cameraMovement: 'Handheld Tracking',
    lighting: 'Natural Morning Window Daylight',
    transition: 'Cut to Subject',
    dialogue: 'It is not about working 14 hours. It is about 90 minutes of ruthless focus.',
    visual: 'POV shot walking into a quiet home office studio, setting phone face-down on desk.',
    broll: 'Digital timer starting at 90:00.',
    dos: ['Ensure phone flip action is decisive', 'Clean desk backdrop'],
    donts: ['Avoid messy clutter', 'No background noise']
  },
  {
    id: 3,
    number: 3,
    title: 'The Energy Audit Method',
    duration: 3,
    cameraAngle: 'Over The Shoulder',
    cameraMovement: 'Subtle Dolly Right',
    lighting: 'Soft Cool Studio LED',
    transition: 'Match Cut',
    dialogue: 'Energy management beats time management every single day.',
    visual: 'Subject marking three green checkmarks on a physical whiteboard dashboard.',
    broll: 'Close-up of marker gliding across board.',
    dos: ['Use bold green marker', 'Keep subject in frame right'],
    donts: ['Don’t obscure the text', 'Avoid harsh shadows']
  },
  {
    id: 4,
    number: 4,
    title: 'The Evening Reset',
    duration: 3,
    cameraAngle: 'Wide Cinematic Shot',
    cameraMovement: 'Slow Orbit',
    lighting: 'Sunset Golden Hour Glow',
    transition: 'Fade Out',
    dialogue: 'Audit your high-energy hours and build your day around them.',
    visual: 'Wide shot of creator closing laptop as golden hour light fills the room.',
    broll: 'Sun setting through floor-to-ceiling glass window.',
    dos: ['Capture natural flare', 'Slow 60fps frame rate'],
    donts: ['Avoid overexposure', 'Don’t cut audio abruptly']
  }
]

export default function InteractiveDemoSection() {
  const [activeSceneId, setActiveSceneId] = useState(1)
  const [viewMode, setViewMode] = useState<'canvas' | 'phone'>('canvas')
  const [copied, setCopied] = useState(false)
  const [activeRightTab, setActiveRightTab] = useState<'hooks' | 'music' | 'repurpose'>('hooks')

  const activeScene = demoScenes.find(s => s.id === activeSceneId) || demoScenes[0]

  const handleCopyScript = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="demo" className="py-24 relative overflow-hidden border-t border-border/50 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary border border-border text-xs font-bold text-foreground">
            <Clapperboard className="h-3.5 w-3.5 text-primary" /> Interactive Creative Studio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            An Infinite Storyboard Studio
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Experience the complete workspace: brief controls, camera direction scene cards, mobile preview, and AI copilot insights.
          </p>
        </div>

        {/* Studio Window Shell */}
        <div className="glass-panel rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
          
          {/* Studio Top Control Bar */}
          <div className="h-12 border-b border-border/70 bg-secondary/40 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-semibold text-muted-foreground ml-3 hidden sm:inline-block">
                Grovii Studio OS — <span className="text-foreground">Founder_Habits_Reel_v1.grovii</span>
              </span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-background/80 p-1 rounded-full border border-border text-xs font-semibold">
              <button
                onClick={() => setViewMode('canvas')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                  viewMode === 'canvas' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Layers className="h-3.5 w-3.5" /> Storyboard Canvas
              </button>
              <button
                onClick={() => setViewMode('phone')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                  viewMode === 'phone' ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" /> Phone Preview
              </button>
            </div>
          </div>

          {/* 3-Column Studio Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* ── LEFT COLUMN: Brief Control Parameters (25% width) ── */}
            <div className="lg:col-span-3 border-r border-border/70 p-5 space-y-6 bg-secondary/20 hidden lg:block">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Sliders className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Brief Controls</h3>
              </div>

              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">Target Platform</span>
                  <div className="p-2.5 rounded-xl bg-card border border-border text-foreground font-bold flex justify-between items-center">
                    <span>Instagram Reels</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">Content Goal</span>
                  <div className="p-2.5 rounded-xl bg-card border border-border text-foreground">
                    High Conversion / Authority Building
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">Target Duration</span>
                  <div className="p-2.5 rounded-xl bg-card border border-border text-foreground font-bold flex justify-between">
                    <span>13 Seconds</span>
                    <span className="text-muted-foreground font-normal">4 Scenes</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">Tone & Pacing</span>
                  <div className="p-2.5 rounded-xl bg-card border border-border text-foreground">
                    Energetic, POV Cinematic
                  </div>
                </div>

                <div className="pt-2">
                  <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 space-y-1.5">
                    <span className="text-[10px] font-bold text-primary uppercase">Concept Vibe</span>
                    <p className="text-[11px] text-foreground font-medium leading-relaxed">
                      “5 Productive Habits of High-Performing Founders”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CENTER COLUMN: Infinite Storyboard Canvas / Phone Preview (50% width) ── */}
            <div className="lg:col-span-6 p-6 space-y-6 bg-card/60 flex flex-col justify-between">
              
              {viewMode === 'canvas' ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Storyboard Timeline Scenes ({demoScenes.length})
                    </span>
                    <span className="text-xs text-primary font-bold">Total: 13s</span>
                  </div>

                  {/* Scene Selector Cards */}
                  <div className="grid gap-3.5">
                    {demoScenes.map((s) => {
                      const isSelected = s.id === activeSceneId
                      return (
                        <div
                          key={s.id}
                          onClick={() => setActiveSceneId(s.id)}
                          className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? 'bg-card border-primary/50 shadow-md ring-1 ring-primary/20' 
                              : 'bg-secondary/30 border-border/60 hover:bg-secondary/60'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-foreground text-background text-xs font-bold flex items-center justify-center">
                                {s.number}
                              </span>
                              <h4 className="text-sm font-bold text-foreground">{s.title}</h4>
                            </div>
                            <Badge variant="outline" className="text-[10px] font-bold bg-secondary">
                              {s.duration}s
                            </Badge>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                            {s.visual}
                          </p>

                          <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-foreground">
                            <span className="bg-secondary px-2 py-0.5 rounded-md border border-border">🎥 {s.cameraAngle}</span>
                            <span className="bg-secondary px-2 py-0.5 rounded-md border border-border">⚡ {s.cameraMovement}</span>
                            <span className="bg-secondary px-2 py-0.5 rounded-md border border-border">💡 {s.lighting}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* Mobile Phone Frame Preview */
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-[280px] aspect-[9/16] bg-black rounded-[40px] border-[10px] border-black shadow-2xl relative overflow-hidden flex flex-col justify-end p-5 text-white select-none">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    
                    <div className="relative z-20 space-y-3">
                      <Badge className="bg-primary text-primary-foreground font-bold text-[9px]">
                        Scene {activeScene.number}: {activeScene.duration}s
                      </Badge>
                      <p className="text-xs font-bold leading-relaxed italic">
                        “{activeScene.dialogue}”
                      </p>
                      <div className="text-[10px] text-zinc-300 font-mono">
                        Camera: {activeScene.cameraAngle} ({activeScene.cameraMovement})
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Script Copy Action Bar */}
              <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold">
                  Script voiceover ready for recording
                </span>
                <Button 
                  size="sm" 
                  onClick={handleCopyScript}
                  className="rounded-full font-bold text-xs shadow-md"
                >
                  {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? 'Copied Full Script' : 'Copy Voiceover'}
                </Button>
              </div>

            </div>

            {/* ── RIGHT COLUMN: AI Copilot Inspector (25% width) ── */}
            <div className="lg:col-span-3 border-l border-border/70 p-5 space-y-5 bg-secondary/20 hidden lg:block">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> AI Director Copilot
                </h3>
              </div>

              {/* Right Tab Switcher */}
              <div className="flex bg-card p-1 rounded-xl border border-border text-[10px] font-bold">
                <button
                  onClick={() => setActiveRightTab('hooks')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${activeRightTab === 'hooks' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                >
                  Alt Hooks
                </button>
                <button
                  onClick={() => setActiveRightTab('music')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${activeRightTab === 'music' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                >
                  Music
                </button>
                <button
                  onClick={() => setActiveRightTab('repurpose')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${activeRightTab === 'repurpose' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                >
                  Social
                </button>
              </div>

              {/* Copilot Tab Output */}
              <div className="text-xs space-y-4">
                {activeRightTab === 'hooks' && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Alternative Viral Hooks</span>
                    <div className="p-3 rounded-xl bg-card border border-border space-y-1 hover:border-primary/40 transition-colors cursor-pointer">
                      <span className="text-[9px] text-amber-500 font-bold">Option 1 (Curiosity)</span>
                      <p className="text-foreground text-[11px] font-medium leading-tight">
                        “The 90-minute rule top founders use to scale.”
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-border space-y-1 hover:border-primary/40 transition-colors cursor-pointer">
                      <span className="text-[9px] text-amber-500 font-bold">Option 2 (Contrarian)</span>
                      <p className="text-foreground text-[11px] font-medium leading-tight">
                        “Working 14 hours is a scam. Do this instead.”
                      </p>
                    </div>
                  </div>
                )}

                {activeRightTab === 'music' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Audio Mood Match</span>
                    <div className="p-3.5 rounded-xl bg-card border border-border space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">Lo-Fi Deep Focus</span>
                        <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px]">98% Match</Badge>
                      </div>
                      <p className="text-muted-foreground text-[11px]">
                        Upbeat acoustic pulse with ambient rain background.
                      </p>
                    </div>
                  </div>
                )}

                {activeRightTab === 'repurpose' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">LinkedIn Post Preview</span>
                    <div className="p-3.5 rounded-xl bg-card border border-border text-[11px] text-foreground leading-relaxed">
                      “I audited 50 high-growth startup founders. The biggest mistake? Focusing on hours instead of energy...”
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
