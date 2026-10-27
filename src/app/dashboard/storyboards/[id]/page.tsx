'use client'

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HiArrowLeft as ArrowLeft,
  HiDocumentDuplicate as Copy,
  HiCheck as Check,
  HiArrowDownTray as Download,
  HiShare as Share2,
  HiFilm as FilmIcon,
  HiDocumentText as ScriptIcon,
  HiListBullet as ListIcon,
  HiMusicalNote as MusicIcon,
  HiChatBubbleLeftRight as CaptionIcon,
  HiArrowsRightLeft as RepurposeIcon,
  HiVideoCamera as CameraIcon,
  HiSparkles as SparklesIcon,
  HiLightBulb as LightBulbIcon,
  HiClock as ClockIcon,
  HiSpeakerWave as VoiceIcon
} from "react-icons/hi2"
import { FaLinkedinIn as LinkedinIcon, FaTwitter as TwitterIcon } from "react-icons/fa6"
import { toast } from "sonner"
import { storyboardService } from "@/services/storyboardService"

type ActiveTab = "scenes" | "script" | "shotlist" | "audio" | "captions" | "repurpose"

export default function StoryboardDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [storyboard, setStoryboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<ActiveTab>("scenes")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [checkedShots, setCheckedShots] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchStoryboard = async () => {
      try {
        const data = await storyboardService.getStoryboard(id)
        setStoryboard(data)
      } catch (error) {
        console.error("Failed to load storyboard", error)
        toast.error("Could not load storyboard.")
      } finally {
        setLoading(false)
      }
    }
    fetchStoryboard()
  }, [id])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      toast.error("Failed to copy text.")
    }
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Project link copied!")
    }
  }

  const handleDownloadShootPlan = () => {
    if (!storyboard) return

    let text = `GROVII CREATIVE SHOOT PLAN\n`
    text += `=====================================\n\n`
    text += `PROJECT: ${storyboard.title || "Untitled Project"}\n`
    text += `PLATFORM: ${storyboard.platform?.toUpperCase()} | DURATION: ${storyboard.duration}s\n`
    text += `IDEA: ${storyboard.idea}\n\n`
    text += `--- OPENING HOOK ---\n"${storyboard.hook || "None"}"\n\n`

    if (storyboard.scenes && storyboard.scenes.length > 0) {
      text += `--- SCENE-BY-SCENE SHOOT PLAN ---\n\n`
      storyboard.scenes.forEach((s: any, idx: number) => {
        text += `SCENE ${s.scene_number || idx + 1} (${s.duration || "3"}s) - ${s.title || "Scene"}\n`
        text += `[WHAT TO RECORD]: ${s.what_to_show || s.what_to_record || s.broll || "Record visual action"}\n`
        text += `[CAMERA]: ${s.camera_angle || "Eye level"} · ${s.camera_movement || "Static"}\n`
        text += `[VOICEOVER]: "${s.voiceover_example || s.what_to_say || ""}"\n`
        if (s.onscreen_text) text += `[ON-SCREEN TEXT]: ${s.onscreen_text}\n`
        if (s.tips) text += `[DIRECTOR TIP]: ${s.tips}\n`
        text += `-------------------------------------\n\n`
      })
    }

    if (storyboard.script) {
      text += `--- FULL VOICE-OVER SCRIPT ---\n${storyboard.script}\n\n`
    }

    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain;charset=utf-8" })
    element.href = URL.createObjectURL(file)
    element.download = `${(storyboard.title || "grovii_shoot_plan").toLowerCase().replace(/\s+/g, "_")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Shoot plan downloaded!")
  }

  const toggleShotCheck = (shotId: string) => {
    setCheckedShots((prev) => ({ ...prev, [shotId]: !prev[shotId] }))
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 select-none">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-xs font-semibold text-muted-foreground">
          Loading your shoot workspace...
        </p>
      </div>
    )
  }

  if (!storyboard) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center select-none">
        <h2 className="text-base font-bold text-foreground">Storyboard not found</h2>
        <p className="text-xs text-muted-foreground">The project may have been moved or removed.</p>
        <Button onClick={() => router.push("/dashboard/storyboards")} className="rounded-xl text-xs font-bold">
          Back to Storyboards
        </Button>
      </div>
    )
  }

  const scenes = storyboard.scenes || []
  const totalDuration = storyboard.duration || scenes.reduce((acc: number, s: any) => acc + (s.duration || 3), 0)

  return (
    <div className="space-y-8 pb-20 select-none">
      
      {/* ── 1. Top Workspace Header Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/storyboards")}
            className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary shrink-0 mt-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-secondary text-secondary-foreground border-none">
                {storyboard.platform || "Reels"}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-semibold px-2 py-0.5 border-border text-muted-foreground">
                <ClockIcon className="h-3 w-3 mr-1 inline text-primary" />
                {totalDuration}s duration
              </Badge>
              {storyboard.tone && (
                <Badge variant="outline" className="text-[10px] font-semibold px-2 py-0.5 border-border text-muted-foreground capitalize">
                  {storyboard.tone}
                </Badge>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              {storyboard.title || storyboard.idea || "Creator Shoot Plan"}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="rounded-xl h-9 px-3 text-xs font-semibold border-border hover:bg-secondary gap-1.5"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadShootPlan}
            className="rounded-xl h-9 px-3 text-xs font-semibold border-border hover:bg-secondary gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            <span>Export Plan</span>
          </Button>

          <Button
            size="sm"
            onClick={() => copyToClipboard(storyboard.script || "", "header-script")}
            className="rounded-xl h-9 px-3.5 bg-primary text-primary-foreground text-xs font-bold gap-1.5 shadow-xs hover:opacity-95"
          >
            {copiedKey === "header-script" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>Copy Script</span>
          </Button>
        </div>

      </div>

      {/* ── 2. Workspace Navigation Tabs ── */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar pb-1">
        {[
          { id: "scenes", label: "Scenes Timeline", icon: FilmIcon, count: scenes.length },
          { id: "script", label: "Voiceover Script", icon: ScriptIcon },
          { id: "shotlist", label: "Shot List", icon: ListIcon },
          { id: "audio", label: "Audio & Music", icon: MusicIcon, count: storyboard.music?.length },
          { id: "captions", label: "Captions & Tags", icon: CaptionIcon },
          { id: "repurpose", label: "Repurpose", icon: RepurposeIcon },
        ].map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? "bg-primary/10 text-primary dark:text-primary-foreground dark:bg-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary dark:text-primary-foreground" : "text-muted-foreground"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isActive ? "bg-primary/20 text-primary dark:text-white" : "bg-secondary text-muted-foreground"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── 3. Tab Content Areas ── */}

      {/* ─── TAB 1: SCENES TIMELINE ─── */}
      {activeTab === "scenes" && (
        <div className="space-y-6">
          
          {/* Primary Hook Banner */}
          {storyboard.hook && (
            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <SparklesIcon className="h-4 w-4" />
                  Grovii Opening Hook (First 3 Seconds)
                </span>
                <button
                  onClick={() => copyToClipboard(storyboard.hook, "main-hook")}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  {copiedKey === "main-hook" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  Copy
                </button>
              </div>
              <p className="text-base sm:text-lg font-bold text-foreground leading-snug">
                “{storyboard.hook}”
              </p>
            </div>
          )}

          {/* Sequential Scene Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Scene by Scene Production Plan
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                {scenes.length} total shots planned
              </span>
            </div>

            <div className="space-y-4">
              {scenes.map((s: any, idx: number) => {
                const whatToRecord = s.what_to_show || s.what_to_record || s.broll || s.subject || "Record primary subject"
                const voiceover = s.voiceover_example || s.what_to_say || s.script_segment || ""
                const camera = s.camera_angle || "Eye Level"
                const movement = s.camera_movement || "Static"
                const onScreenText = s.onscreen_text || ""
                const shotTip = s.tips || (s.dos && Array.isArray(s.dos) ? s.dos.join(". ") : null)

                return (
                  <div
                    key={s.id || idx}
                    className="rounded-3xl border border-border bg-card p-6 space-y-5 shadow-xs transition-all hover:border-primary/20"
                  >
                    {/* Scene Top Badge Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shadow-xs">
                          {s.scene_number || idx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          {s.title || `Scene ${s.scene_number || idx + 1}`}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[11px] font-semibold border-border text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1 inline text-primary" />
                          {s.duration || 3}s
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border-none">
                          <CameraIcon className="h-3 w-3 mr-1 inline text-muted-foreground" />
                          {camera}
                        </Badge>
                      </div>
                    </div>

                    {/* WHAT TO RECORD (Primary Visual Focus) */}
                    <div className="space-y-1.5 bg-secondary/30 p-4 rounded-2xl border border-border/50">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                        <FilmIcon className="h-3.5 w-3.5 text-primary" />
                        What to Record
                      </span>
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        {whatToRecord}
                      </p>
                    </div>

                    {/* 2-Column Grid: Voiceover & On-Screen Text */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Voiceover / What to Say */}
                      <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                              <VoiceIcon className="h-3.5 w-3.5 text-primary" />
                              Voiceover / What to Say
                            </span>
                            {voiceover && (
                              <button
                                onClick={() => copyToClipboard(voiceover, `vo-${s.id || idx}`)}
                                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                              >
                                {copiedKey === `vo-${s.id || idx}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                Copy
                              </button>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-foreground italic leading-relaxed pt-1">
                            {voiceover ? `“${voiceover}”` : "No voiceover — purely visual / music beat."}
                          </p>
                        </div>
                      </div>

                      {/* On-Screen Text Overlay & Camera Direction */}
                      <div className="p-4 rounded-2xl bg-secondary/20 border border-border/60 space-y-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                            On-Screen Text
                          </span>
                          <p className="text-xs font-bold text-foreground">
                            {onScreenText || "None"}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Camera Motion: <strong className="text-foreground">{movement}</strong></span>
                          {s.lighting && <span>Light: <strong className="text-foreground">{s.lighting}</strong></span>}
                        </div>
                      </div>

                    </div>

                    {/* Director Shooting Tip */}
                    {shotTip && (
                      <div className="flex items-start gap-2.5 text-xs text-muted-foreground bg-primary/5 border border-primary/15 p-3 rounded-xl">
                        <LightBulbIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-foreground">Director Note:</strong> {shotTip}
                        </p>
                      </div>
                    )}

                  </div>
                )
              })}
            </div>
          </div>

        </div>
      )}

      {/* ─── TAB 2: VOICEOVER SCRIPT (TELEPROMPTER MODE) ─── */}
      {activeTab === "script" && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Full Spoken Voiceover Script
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Optimized pacing for clear delivery and maximum retention.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => copyToClipboard(storyboard.script || "", "script-tab")}
              className="rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5"
            >
              {copiedKey === "script-tab" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              Copy All Script
            </Button>
          </div>

          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/60">
            <p className="text-base sm:text-lg font-medium text-foreground leading-loose whitespace-pre-wrap select-text">
              {storyboard.script || "Script not available."}
            </p>
          </div>
        </div>
      )}

      {/* ─── TAB 3: SHOT LIST (FILMING CHECKLIST) ─── */}
      {activeTab === "shotlist" && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Production Shot Checklist
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Check off scenes on set as you record them on your camera or phone.
              </p>
            </div>
            <span className="text-xs font-bold text-primary">
              {Object.values(checkedShots).filter(Boolean).length} of {scenes.length} recorded
            </span>
          </div>

          <div className="divide-y divide-border">
            {scenes.map((s: any, idx: number) => {
              const shotKey = s.id || `shot-${idx}`
              const isChecked = !!checkedShots[shotKey]

              return (
                <div
                  key={shotKey}
                  onClick={() => toggleShotCheck(shotKey)}
                  className={`py-4 px-3 flex items-start gap-4 cursor-pointer rounded-xl transition-colors ${
                    isChecked ? "opacity-50 line-through bg-secondary/30" : "hover:bg-secondary/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-foreground">
                        Shot #{s.scene_number || idx + 1}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        ({s.duration || 3}s) · {s.camera_angle || "Eye Level"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {s.what_to_show || s.what_to_record || "Record scene"}
                    </p>
                    {s.voiceover_example && (
                      <p className="text-xs text-muted-foreground italic">
                        Dialogue: “{s.voiceover_example}”
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 4: AUDIO & MUSIC ─── */}
      {activeTab === "audio" && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">
              Recommended Songs & Sound Suggestions
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Trending tracks and sound dynamics tailored to match the energy of this shoot.
            </p>
          </div>

          {(!storyboard.music || storyboard.music.length === 0) ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No specific audio tracks attached. Ambient energetic background music is recommended.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {storyboard.music.map((m: any, idx: number) => {
                const song = m.song_name || m.genre || "Featured Sound"
                const artist = m.artist || "Recommended Artist"

                return (
                  <div
                    key={m.id || idx}
                    className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        {m.genre || "Audio Track"}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">
                        {song}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium">
                        {artist}
                      </p>
                      {m.reason && (
                        <p className="text-xs text-muted-foreground pt-1 leading-relaxed">
                          {m.reason}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-muted-foreground">
                        Mood: {m.mood || "Energetic"}
                      </span>
                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(`${song} ${artist}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Find on Spotify →
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 5: CAPTIONS & HASHTAGS ─── */}
      {activeTab === "captions" && (
        <div className="space-y-6">
          
          {/* Post Captions */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
            <div className="pb-3 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">
                High-Converting Post Captions
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                Choose the caption angle that best fits your channel vibe.
              </p>
            </div>

            {(!storyboard.captions || storyboard.captions.length === 0) ? (
              <p className="text-xs text-muted-foreground py-4">No captions generated.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {storyboard.captions.map((c: any, idx: number) => (
                  <div
                    key={c.id || idx}
                    className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                        Option {idx + 1}
                      </span>
                      <p className="text-xs font-medium text-foreground leading-relaxed select-text">
                        {c.caption}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(c.caption, `cap-${idx}`)}
                      className="w-full rounded-xl text-xs font-bold border-border hover:bg-secondary gap-1.5"
                    >
                      {copiedKey === `cap-${idx}` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      Copy Caption
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hashtags */}
          {storyboard.hashtags && storyboard.hashtags.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="text-base font-bold text-foreground">
                  Relevant Hashtags
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(storyboard.hashtags.map((h: any) => h.hashtag).join(" "), "all-tags")}
                  className="rounded-xl text-xs font-bold text-primary hover:text-primary gap-1"
                >
                  {copiedKey === "all-tags" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  Copy All Tags
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {storyboard.hashtags.map((h: any, idx: number) => (
                  <Badge
                    key={h.id || idx}
                    onClick={() => copyToClipboard(h.hashtag, `tag-${idx}`)}
                    className="cursor-pointer bg-secondary/60 hover:bg-secondary text-foreground text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/60 transition-colors"
                  >
                    {h.hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ─── TAB 6: REPURPOSE CONTENT ─── */}
      {activeTab === "repurpose" && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">
              Cross-Platform Repurposing
            </h2>
            <p className="text-xs text-muted-foreground font-medium">
              Transform your video concept into high-engagement written posts for LinkedIn & X.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* LinkedIn Post Format */}
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/60 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A66C2] flex items-center gap-1.5">
                    <LinkedinIcon className="h-4 w-4" /> LinkedIn Post Hook
                  </span>
                  <button
                    onClick={() => copyToClipboard(
                      `${storyboard.hook || storyboard.idea}\n\nHere is how to execute this in 4 steps:\n\n1. Focus on the core bottleneck\n2. Batch production into focused sprints\n3. Protect creative clarity\n\nWhat is your biggest roadblock?`,
                      "li-post"
                    )}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    {copiedKey === "li-post" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    Copy
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-xs leading-relaxed space-y-2 select-text">
                  <p className="font-bold text-foreground">
                    {storyboard.hook || storyboard.idea}
                  </p>
                  <p className="text-muted-foreground">
                    Most creators overcomplicate their pre-production. Here is the exact shoot blueprint:
                  </p>
                  <p className="text-muted-foreground">
                    1. Focus on the core hook within 3 seconds.<br />
                    2. Film visually engaging B-roll before recording voiceover.<br />
                    3. Keep pacing tight and punchy.
                  </p>
                </div>
              </div>
            </div>

            {/* Twitter / X Thread Format */}
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/60 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <TwitterIcon className="h-3.5 w-3.5" /> X / Twitter Thread Starter
                  </span>
                  <button
                    onClick={() => copyToClipboard(
                      `How to turn "${storyboard.idea}" into high-converting video content (without spending 5 hours editing):\n\n🧵 Thread below:`,
                      "tw-post"
                    )}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    {copiedKey === "tw-post" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    Copy
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border text-xs leading-relaxed space-y-2 select-text">
                  <p className="font-bold text-foreground">
                    How to execute "{storyboard.idea}" in 60 seconds:
                  </p>
                  <p className="text-muted-foreground">
                    1/ The Hook: "{storyboard.hook || "Pattern interrupt hook"}"<br />
                    2/ The Breakdown: Deliver 3 core actionable steps.<br />
                    3/ The Call to Action: Ask a single focused question in the comments.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
