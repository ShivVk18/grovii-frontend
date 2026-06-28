'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Play,
  Pause,
  Plus,
  Trash2,
  Download,
  Share2,
  Layers,
  Sliders,
  Film,
  ChevronRight,
  Settings2,
  Clapperboard,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from "lucide-react"

import { useStoryboardForm } from "@/hooks/useStoryboardForm"

type SceneData = {
  id: number
  number: number
  duration: number
  title: string
  visual: string
  cameraAngle: string
  sound: string
  dialogue: string
  scene_image_url?: string
}

export default function CreateStoryboardPage() {
  const [activeTab, setActiveTab] = useState<"brief" | "style" | "advanced" | "canvas">("brief")
  const [step, setStep] = useState(1)
  
  const {
    submitForm,
    isSubmitting,
    data: generatedData,
  } = useStoryboardForm()

  const [idea, setIdea] = useState("")
  const [goal, setGoal] = useState("inspire")
  const [tone, setTone] = useState("energetic")
  const [duration, setDuration] = useState("15")
  const [audience, setAudience] = useState("")
  const [contentStyle, setContentStyle] = useState("pov")
  const [platform, setPlatform] = useState("reels")
  const [generateScript, setGenerateScript] = useState(true)
  const [reference, setReference] = useState("")

  const handleGenerate = () => {
    submitForm({
      idea,
      goal,
      tone,
      style: contentStyle,
      audience,
      duration: parseInt(duration),
      platform,
    })
  }

  const [scenes, setScenes] = useState<SceneData[]>([])
  const [selectedSceneId, setSelectedSceneId] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [playingSceneIndex, setPlayingSceneIndex] = useState(0)

  useEffect(() => {
    if (generatedData?.scenes) {
      setStep(3)
      const newScenes: SceneData[] = generatedData.scenes.map((s: any) => ({
        id: s.number,
        number: s.number,
        duration: s.duration,
        title: s.title,
        visual: s.visual,
        cameraAngle: s.cameraAngle,
        sound: s.sound,
        dialogue: s.dialogue,
        scene_image_url: s.scene_image_url
      }))
      setScenes(newScenes)
      if (newScenes.length > 0) {
        setSelectedSceneId(newScenes[0].id)
      }
    }
  }, [generatedData])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && scenes.length > 0) {
      interval = setInterval(() => {
        setPlayingSceneIndex((prevIndex) => {
          if (prevIndex >= scenes.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prevIndex + 1
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, scenes])

  const handleAddScene = () => {
    const newId = Date.now()
    const newScene: SceneData = {
      id: newId,
      number: scenes.length + 1,
      title: `Scene ${scenes.length + 1}`,
      visual: "Describe what the camera sees here...",
      dialogue: "Write the script voiceover here...",
      sound: "Music and sound effect details...",
      duration: 4,
      cameraAngle: "Medium Shot"
    }
    const updated = [...scenes, newScene]
    setScenes(updated)
    setSelectedSceneId(newId)
  }

  const handleDeleteScene = (id: number) => {
    if (scenes.length <= 1) return
    const filtered = scenes.filter(s => s.id !== id)
    const updated = filtered.map((s, idx) => ({ ...s, number: idx + 1 }))
    setScenes(updated)
    if (selectedSceneId === id) {
      setSelectedSceneId(updated[0].id)
    }
  }

  const handleUpdateScene = (id: number, field: keyof SceneData, value: any) => {
    setScenes(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const selectedScene = scenes.find(s => s.id === selectedSceneId) || null

  return (
    <div className="absolute inset-0 bg-background flex flex-col font-sans overflow-hidden">
      
      {/* Workspace Header toolbar */}
      <header className="h-16 px-6 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Projects</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <h1 className="text-base font-bold text-foreground tracking-tight">
                {idea ? (idea.length > 25 ? idea.substring(0, 25) + "..." : idea) : "Untitled Project"}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground font-medium">Draft auto-saved to cloud</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setScenes([])
              setIdea("")
              setSelectedSceneId(null)
            }}
            className="rounded-full transition"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full transition hidden sm:inline-flex"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>

          <Button
            size="sm"
            className="rounded-full shadow-md font-semibold transition"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Reel
          </Button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Dock Panel */}
        <div className="w-20 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col items-center py-6 gap-6 z-20 shrink-0">
          <TabButton active={activeTab === "brief"} icon={<Sparkles />} label="Brief" onClick={() => setActiveTab("brief")} />
          <TabButton active={activeTab === "style"} icon={<Sliders />} label="Style" onClick={() => setActiveTab("style")} />
          <TabButton active={activeTab === "advanced"} icon={<Settings2 />} label="Config" onClick={() => setActiveTab("advanced")} />
          <TabButton active={activeTab === "canvas"} icon={<Layers />} label="Layers" onClick={() => setActiveTab("canvas")} />
        </div>

        {/* Tab Content Flyout */}
        <div className="w-80 border-r border-border bg-card/80 backdrop-blur-md flex flex-col overflow-hidden shrink-0 relative z-10 shadow-xl">
          <div className="p-6 border-b border-border bg-background/50">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              {activeTab === "brief" && <><Sparkles className="h-5 w-5 text-primary" /> AI Creative Brief</>}
              {activeTab === "style" && <><Sliders className="h-5 w-5 text-primary" /> Tone & Design Kit</>}
              {activeTab === "advanced" && <><Settings2 className="h-5 w-5 text-primary" /> Advanced Settings</>}
              {activeTab === "canvas" && <><Layers className="h-5 w-5 text-primary" /> Storyboard Structure</>}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Configure parameters to customize the generation canvas</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "brief" && (
                <motion.div
                  key="brief"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">What’s your video idea?</Label>
                    <Textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="e.g. A fast-paced breakdown of modern architecture..."
                      className="min-h-[120px] rounded-2xl resize-none bg-background focus-visible:ring-primary/20"
                    />
                    <div className="flex gap-2 flex-wrap mt-2">
                      <Badge 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={() => setIdea("My morning routine at 5 AM that fuels my productivity")}
                      >
                        💡 5 AM Routine
                      </Badge>
                      <Badge 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={() => setIdea("3 secret UI design hacks to save time")}
                      >
                        ⚡ Design Hacks
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">Goal of the Video</Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger className="rounded-xl h-11 bg-background">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="inspire">Inspire</SelectItem>
                        <SelectItem value="educate">Educate</SelectItem>
                        <SelectItem value="entertain">Entertain</SelectItem>
                        <SelectItem value="promote">Promote</SelectItem>
                        <SelectItem value="story">Tell a Story</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="rounded-xl h-11 bg-background">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="10">10 seconds (Short hook)</SelectItem>
                        <SelectItem value="15">15 seconds (Standard)</SelectItem>
                        <SelectItem value="20">20 seconds (Detailed)</SelectItem>
                        <SelectItem value="30">30 seconds (Long-form)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {activeTab === "style" && (
                <motion.div
                  key="style"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">Tone & Vibe</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="rounded-xl h-11 bg-background">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="energetic">Energetic & Fast</SelectItem>
                        <SelectItem value="emotional">Emotional & Heavy</SelectItem>
                        <SelectItem value="calm">Calm & Minimal</SelectItem>
                        <SelectItem value="humorous">Humorous & Clever</SelectItem>
                        <SelectItem value="trendy">Trendy & Relatable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">Visual Style</Label>
                    <Select value={contentStyle} onValueChange={setContentStyle}>
                      <SelectTrigger className="rounded-xl h-11 bg-background">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="pov">POV (Point of View)</SelectItem>
                        <SelectItem value="cinematic">Cinematic B-Roll</SelectItem>
                        <SelectItem value="aesthetic">Aesthetic Cozy</SelectItem>
                        <SelectItem value="documentary">Minimal Documentary</SelectItem>
                        <SelectItem value="fastcuts">Fast Cuts & Transitions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {activeTab === "advanced" && (
                <motion.div
                  key="advanced"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">Platform Format</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="rounded-xl h-11 bg-background">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="reels">Instagram Reels</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="shorts">YouTube Shorts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border shadow-sm">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold text-foreground">AI Script Writer</Label>
                      <p className="text-xs text-muted-foreground">Auto-write voiceover captions</p>
                    </div>
                    <Switch checked={generateScript} onCheckedChange={setGenerateScript} />
                  </div>
                </motion.div>
              )}

              {activeTab === "canvas" && (
                <motion.div
                  key="canvas"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {scenes.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground text-sm font-medium">
                      No layers generated. Provide a brief and hit generate.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {scenes.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => setSelectedSceneId(s.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                            selectedSceneId === s.id
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "bg-background border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-foreground text-xs font-bold">
                              {s.number}
                            </span>
                            <div className="text-left">
                              <h4 className="text-sm font-bold text-foreground line-clamp-1">{s.title || `Scene ${s.number}`}</h4>
                              <p className="text-xs text-muted-foreground">{s.cameraAngle} · {s.duration}s</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteScene(s.id)
                            }}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        onClick={handleAddScene}
                        variant="outline"
                        className="w-full mt-2 rounded-xl border-dashed py-6 gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-4 w-4" />
                        Add Custom Scene
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-6 border-t border-border bg-background/50 backdrop-blur-md">
            <Button
              onClick={handleGenerate}
              disabled={!idea || isSubmitting}
              className="w-full h-12 rounded-full font-bold shadow-md transition-all hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Generate Storyboard
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Spatial Canvas Area */}
        <div className="flex-1 bg-muted/30 flex flex-col p-6 overflow-hidden relative select-none">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none"></div>

          {/* Canvas Controls */}
          <div className="flex items-center justify-between mb-6 z-10 glass-panel p-2 rounded-2xl max-w-fit mx-auto shadow-sm">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))} className="h-9 w-9 rounded-xl">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-bold w-12 text-center">{zoom}%</span>
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(150, zoom + 10))} className="h-9 w-9 rounded-xl">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            {scenes.length > 0 && (
              <div className="flex items-center pl-4 border-l border-border ml-2">
                <Button
                  onClick={() => {
                    if (isPlaying) setIsPlaying(false)
                    else { setPlayingSceneIndex(0); setIsPlaying(true) }
                  }}
                  variant="secondary"
                  className="rounded-xl font-bold gap-2"
                >
                  {isPlaying ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Play All</>}
                </Button>
              </div>
            )}
          </div>

          {/* Canvas Board */}
          <div className="flex-1 flex items-center justify-center overflow-y-auto relative p-8">
            
            {isSubmitting && (
              <div className="absolute inset-0 glass-panel z-30 flex flex-col items-center justify-center gap-6 backdrop-blur-2xl">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Crafting your vision</h3>
                  <p className="text-sm text-muted-foreground">Analyzing pacing, shots, and writing hooks...</p>
                </div>
              </div>
            )}

            {scenes.length === 0 && !isSubmitting && (
              <div className="max-w-md w-full glass-panel border-dashed p-10 rounded-3xl text-center shadow-xl space-y-6 animate-fade-in relative overflow-hidden">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center shadow-inner">
                  <Clapperboard className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Canvas is empty</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Enter your creative brief in the left panel and click generate. The AI will structure engaging scenes and hook copy.
                  </p>
                </div>
              </div>
            )}

            {scenes.length > 0 && !isSubmitting && (
              <div 
                className="flex gap-10 items-center justify-center transition-transform duration-300 origin-center"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                {/* 9:16 Mobile Device Mockup */}
                <div className="w-[340px] aspect-[9/16] bg-black rounded-[48px] shadow-2xl border-[14px] border-black overflow-hidden relative flex flex-col shrink-0">
                  {/* Dynamic Island Mockup */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-20"></div>

                  <div className="flex-1 w-full h-full relative overflow-hidden bg-zinc-900 flex flex-col justify-end p-6">
                    {/* Scene Image / Background */}
                    <div className="absolute inset-0 z-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                      <img 
                        src={`https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80`} 
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                        alt="Background Mockup" 
                      />
                    </div>

                    <div className="relative z-10 space-y-6">
                      <div className="space-y-4 text-center glass-panel bg-black/40 border-white/10 p-5 rounded-2xl backdrop-blur-xl">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground border-none font-bold">
                          {isPlaying ? scenes[playingSceneIndex].cameraAngle : selectedScene?.cameraAngle}
                        </Badge>
                        <h4 className="text-white font-bold text-lg leading-tight">
                          {isPlaying ? scenes[playingSceneIndex].title : selectedScene?.title}
                        </h4>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {isPlaying ? scenes[playingSceneIndex].visual : selectedScene?.visual}
                        </p>
                      </div>

                      <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50"></div>
                        <p className="text-white font-bold text-sm leading-snug">
                          {isPlaying ? `“${scenes[playingSceneIndex].dialogue}”` : selectedScene ? `“${selectedScene.dialogue}”` : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Properties Editor */}
                {selectedScene && (
                  <Card className="w-[420px] glass-panel border-border shadow-2xl p-6 rounded-3xl space-y-6 shrink-0 relative overflow-visible">
                    {/* Connection line to phone */}
                    <div className="absolute top-1/2 -left-10 w-10 h-px bg-border dashed pointer-events-none"></div>

                    <div className="flex justify-between items-center pb-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground text-lg font-black">
                          {selectedScene.number}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-foreground">Scene Settings</h3>
                          <p className="text-xs text-muted-foreground">Adjust layer properties</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary p-1.5 rounded-xl">
                        <Input
                          type="number"
                          value={selectedScene.duration}
                          onChange={(e) => handleUpdateScene(selectedScene.id, "duration", Number(e.target.value))}
                          className="w-14 h-8 rounded-lg text-center font-bold text-sm bg-background border-none"
                        />
                        <span className="text-xs font-bold text-muted-foreground pr-2">sec</span>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Scene Title</Label>
                        <Input
                          value={selectedScene.title}
                          onChange={(e) => handleUpdateScene(selectedScene.id, "title", e.target.value)}
                          className="rounded-xl h-10 font-semibold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Visual Action</Label>
                        <Textarea
                          value={selectedScene.visual}
                          onChange={(e) => handleUpdateScene(selectedScene.id, "visual", e.target.value)}
                          className="min-h-[80px] rounded-xl resize-none text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-foreground">Camera</Label>
                          <Select
                            value={selectedScene.cameraAngle}
                            onValueChange={(val) => handleUpdateScene(selectedScene.id, "cameraAngle", val)}
                          >
                            <SelectTrigger className="rounded-xl h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="Extreme Close Up">Extreme Close</SelectItem>
                              <SelectItem value="Close Up">Close Up</SelectItem>
                              <SelectItem value="Medium Shot">Medium Shot</SelectItem>
                              <SelectItem value="Wide Shot">Wide Shot</SelectItem>
                              <SelectItem value="POV Shot">POV Shot</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-foreground">Audio / SFX</Label>
                          <Input
                            value={selectedScene.sound}
                            onChange={(e) => handleUpdateScene(selectedScene.id, "sound", e.target.value)}
                            className="rounded-xl h-10 text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-foreground">Dialogue (Captions)</Label>
                        <Textarea
                          value={selectedScene.dialogue}
                          onChange={(e) => handleUpdateScene(selectedScene.id, "dialogue", e.target.value)}
                          className="min-h-[100px] rounded-xl resize-none text-sm font-semibold border-l-4 border-l-primary"
                        />
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Bottom Panel */}
      {scenes.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="h-44 border-t border-border bg-card/90 backdrop-blur-xl flex flex-col p-4 z-20 shrink-0"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" /> Timeline
            </span>
            <Badge variant="secondary" className="font-mono text-xs">
              {scenes.reduce((sum, s) => sum + s.duration, 0)}s Total
            </Badge>
          </div>

          <div className="flex-1 flex gap-3 overflow-x-auto pb-2 items-center">
            {scenes.map((s, idx) => (
              <motion.div
                key={s.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedSceneId(s.id)}
                className={`min-w-[180px] w-[180px] h-full flex flex-col p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedSceneId === s.id
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "bg-background border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Scene {s.number}</span>
                  <span className="text-[10px] font-mono font-bold bg-secondary px-1.5 py-0.5 rounded-md">
                    {s.duration}s
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground line-clamp-1 mb-1">
                  {s.title || `Scene ${s.number}`}
                </h4>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {s.visual}
                </p>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={handleAddScene}
              className="min-w-[120px] w-[120px] h-full border-2 border-dashed border-border rounded-2xl bg-secondary/30 hover:bg-secondary/80 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs font-bold">Add</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function TabButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
        active 
          ? "bg-primary text-primary-foreground shadow-lg scale-110" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
      <span className="text-[9px] font-bold tracking-wider">{label}</span>
    </button>
  )
}
