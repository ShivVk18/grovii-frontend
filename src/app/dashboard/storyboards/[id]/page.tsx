'use client'

import React, { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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
  HiSpeakerWave as VoiceIcon,
  HiArrowTrendingUp as TipsIcon,
  HiExclamationTriangle as WarnIcon,
  HiCloudArrowDown as SavedIcon,
} from "react-icons/hi2"
import { toast } from "sonner"
import { storyboardService } from "@/services/storyboardService"
import { statusOf } from "@/lib/apiErrors"
import { loadPlan, savePlan } from "@/lib/savedPlans"
import type { MusicItem, Scene, Storyboard } from "@/types"

type TabId = "scenes" | "script" | "shotlist" | "audio" | "captions" | "tips" | "repurpose"

type Trend = {
  id?: string
  posting_time?: string | null
  editing_style?: string | null
  content_gap?: string | null
  transitions?: string[] | null
  sounds?: string[] | null
}

type Repurpose = Partial<Record<"linkedin" | "twitter" | "carousel" | "blog" | "newsletter", string | null>>

const REPURPOSE_FORMATS: { key: keyof Repurpose; label: string; empty: string }[] = [
  { key: "linkedin", label: "LinkedIn post", empty: "No LinkedIn post was generated for this plan." },
  { key: "twitter", label: "X / Twitter thread", empty: "No X thread was generated for this plan." },
  { key: "carousel", label: "Carousel slides", empty: "No carousel was generated for this plan." },
  { key: "blog", label: "Blog post", empty: "No blog post was generated for this plan." },
  { key: "newsletter", label: "Newsletter", empty: "No newsletter was generated for this plan." },
]

/** 75 -> "1:15" */
function clock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

function sceneTime(s: Scene): string | null {
  if (typeof s.start_seconds === "number" && typeof s.end_seconds === "number") {
    return `${clock(s.start_seconds)}–${clock(s.end_seconds)}`
  }
  return s.duration ? `${s.duration}s` : null
}

function safeFileName(name: string): string {
  return (name || "grovii_shoot_plan").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 60) || "grovii_shoot_plan"
}

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; savedAt?: string }
  | { kind: "not-found" }
  | { kind: "error" }

export default function StoryboardDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [storyboard, setStoryboard] = useState<Storyboard | null>(null)
  const [load, setLoad] = useState<LoadState>({ kind: "loading" })
  const [activeTab, setActiveTab] = useState<TabId>("scenes")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [checkedShots, setCheckedShots] = useState<Record<string, boolean>>({})
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const fetchStoryboard = useCallback(async () => {
    try {
      const data = await storyboardService.getStoryboard(id)
      setStoryboard(data)
      setLoad({ kind: "ready" })
      savePlan(id, data)
    } catch (error) {
      const status = statusOf(error)
      if (status === 404 || status === 403) {
        setLoad({ kind: "not-found" })
        return
      }
      if (status === 401) return // the API client redirects to sign in
      // Poor signal or a server problem: fall back to the copy saved on this device.
      const saved = loadPlan<Storyboard>(id)
      if (saved) {
        setStoryboard(saved.plan)
        setLoad({ kind: "ready", savedAt: saved.savedAt })
      } else {
        setLoad({ kind: "error" })
      }
    }
  }, [id])

  useEffect(() => {
    // Fetch on mount; state updates happen after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchStoryboard()
  }, [fetchStoryboard])

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      toast.error("Couldn't copy. Select the text and copy it by hand.")
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied. Only you can open it while signed in.")
    } catch {
      toast.error("Couldn't copy the link.")
    }
  }

  const handleDownloadShootPlan = () => {
    if (!storyboard) return
    let text = `GROVII SHOOT PLAN\n=====================================\n\n`
    text += `PROJECT: ${storyboard.title || "Untitled"}\n`
    text += `PLATFORM: ${storyboard.platform?.toUpperCase()} | DURATION: ${storyboard.duration}s\n`
    text += `IDEA: ${storyboard.idea}\n`
    if (storyboard.brief_choice) text += `EXAMPLE CHOSEN: ${storyboard.brief_choice}\n`
    text += `\n--- OPENING HOOK ---\n"${storyboard.hook || "None"}"\n\n`
    const scenes = storyboard.scenes || []
    if (scenes.length > 0) {
      text += `--- SCENE BY SCENE ---\n\n`
      scenes.forEach((s, idx) => {
        text += `SCENE ${s.scene_number || idx + 1} (${sceneTime(s) || ""}) - ${s.title || "Scene"}\n`
        text += `[WHAT TO RECORD]: ${s.what_to_show || s.what_to_record || s.broll || ""}\n`
        text += `[CAMERA]: ${s.camera_angle || "Eye level"} · ${s.camera_movement || "Static"}\n`
        text += `[SAY]: "${s.voiceover_example || s.what_to_say || ""}"\n`
        if (s.onscreen_text) text += `[ON-SCREEN TEXT]: ${s.onscreen_text}\n`
        if (s.tips) text += `[TIP]: ${s.tips}\n`
        text += `-------------------------------------\n\n`
      })
    }
    if (storyboard.script) text += `--- FULL SCRIPT ---\n${storyboard.script}\n\n`
    const element = document.createElement("a")
    element.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }))
    element.download = `${safeFileName(storyboard.title || "")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Shoot plan downloaded!")
  }

  if (load.kind === "loading") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3" role="status">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden />
        <p className="text-sm font-semibold text-muted-foreground">Loading your shoot plan…</p>
      </div>
    )
  }

  if (load.kind === "not-found") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-lg font-bold text-foreground">Shoot plan not found</h1>
        <p className="text-sm text-muted-foreground">It may have been deleted, or it belongs to another account.</p>
        <Button onClick={() => router.push("/dashboard/storyboards")} className="rounded-xl text-xs font-bold">
          Back to My Storyboards
        </Button>
      </div>
    )
  }

  if (load.kind === "error" || !storyboard) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center">
        <h1 className="sr-only">Shoot plan</h1>
        <div role="alert" className="space-y-1">
          <p className="text-lg font-bold text-foreground">We couldn&apos;t load this shoot plan</p>
          <p className="text-sm text-muted-foreground">Check your connection, then try again.</p>
        </div>
        <Button onClick={() => { setLoad({ kind: "loading" }); void fetchStoryboard() }} className="rounded-xl text-xs font-bold">
          Try again
        </Button>
      </div>
    )
  }

  const scenes: Scene[] = storyboard.scenes || []
  const music: MusicItem[] = storyboard.music || []
  const trends: Trend[] = (storyboard.trends || []) as Trend[]
  const repurpose: Repurpose = (storyboard.repurpose || {}) as Repurpose
  const constraints = storyboard.constraints
  const generating = storyboard.status === "queued" || storyboard.status === "running"
  const recorded = Object.values(checkedShots).filter(Boolean).length

  const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: "scenes", label: "Scenes", icon: FilmIcon, count: scenes.length },
    { id: "script", label: "Script", icon: ScriptIcon },
    { id: "shotlist", label: "Shot list", icon: ListIcon },
    { id: "audio", label: "Audio & music", icon: MusicIcon, count: music.length },
    { id: "captions", label: "Captions & tags", icon: CaptionIcon },
    { id: "tips", label: "Posting tips", icon: TipsIcon },
    { id: "repurpose", label: "Repurpose", icon: RepurposeIcon },
  ]

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    const move = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
    if (!move && e.key !== "Home" && e.key !== "End") return
    e.preventDefault()
    const next = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (index + move + tabs.length) % tabs.length
    setActiveTab(tabs[next].id)
    tabRefs.current[tabs[next].id]?.focus()
  }

  const copyButton = (text: string, k: string, label = "Copy") => (
    <CopyTextButton copied={copiedKey === k} label={label} onCopy={() => copyToClipboard(text, k)} />
  )

  return (
    <div className="space-y-8 pb-20">
      {load.savedAt && (
        <div role="note" className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-foreground">
          <SavedIcon className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
          <span>
            You&apos;re viewing a saved copy from {new Date(load.savedAt).toLocaleString()}. It may be out of date.
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" aria-label="Back to My Storyboards"
            onClick={() => router.push("/dashboard/storyboards")}
            className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary shrink-0 mt-0.5">
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider bg-secondary text-secondary-foreground border-none">
                {storyboard.platform || "Reels"}
              </Badge>
              <Badge variant="outline" className="text-[11px] font-semibold px-2 py-0.5 border-border text-foreground/80">
                <ClockIcon className="h-3 w-3 mr-1 inline text-primary" aria-hidden />
                {storyboard.duration}s
              </Badge>
              {storyboard.tone && (
                <Badge variant="outline" className="text-[11px] font-semibold px-2 py-0.5 border-border text-foreground/80 capitalize">
                  {storyboard.tone}
                </Badge>
              )}
              {constraints?.faceless && (
                <Badge variant="outline" className="text-[11px] font-semibold px-2 py-0.5 border-border text-foreground/80">Faceless</Badge>
              )}
              {constraints?.location && (
                <Badge variant="outline" className="text-[11px] font-semibold px-2 py-0.5 border-border text-foreground/80">
                  Location: {constraints.location}
                </Badge>
              )}
              {constraints?.equipment && (
                <Badge variant="outline" className="text-[11px] font-semibold px-2 py-0.5 border-border text-foreground/80">
                  Gear: {constraints.equipment}
                </Badge>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              {storyboard.title || storyboard.idea || "Shoot plan"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button variant="outline" size="sm" onClick={handleShare}
            className="rounded-xl h-9 px-3 text-xs font-semibold border-border hover:bg-secondary gap-1.5">
            <Share2 className="h-3.5 w-3.5" aria-hidden /><span>Copy link</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadShootPlan}
            className="rounded-xl h-9 px-3 text-xs font-semibold border-border hover:bg-secondary gap-1.5">
            <Download className="h-3.5 w-3.5 text-primary" aria-hidden /><span>Download plan</span>
          </Button>
          <Button size="sm" onClick={() => copyToClipboard(storyboard.script || "", "header-script")} disabled={!storyboard.script}
            className="rounded-xl h-9 px-3.5 bg-primary text-primary-foreground text-xs font-bold gap-1.5 shadow-xs hover:opacity-95">
            {copiedKey === "header-script" ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
            <span>Copy script</span>
          </Button>
        </div>
      </div>

      {/* Notices */}
      {generating && (
        <div role="note" className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-sm text-foreground">
          This shoot plan is still being created. It will fill in when it&apos;s ready.{" "}
          <Link href="/dashboard/jobs" className="font-bold text-primary underline">See progress</Link>
        </div>
      )}
      {storyboard.status_reason && (
        <div role="note" className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-foreground">
          <WarnIcon className="h-4 w-4 mt-0.5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden />
          <span>{storyboard.status_reason}</span>
        </div>
      )}
      {storyboard.brief_choice && (
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Example we picked for your idea:</strong>{" "}
          <span>{storyboard.brief_choice}</span>
        </p>
      )}

      {/* Tabs */}
      <div role="tablist" aria-label="Shoot plan sections"
        className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => onTabKey(e, index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive ? "bg-primary/10 text-primary dark:text-primary-foreground dark:bg-primary/20"
                  : "text-foreground/75 hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="text-[11px] px-1.5 rounded-md bg-secondary text-foreground/80">{tab.count}</span>
              )}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} tabIndex={0}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-3xl">

        {activeTab === "scenes" && (
          <div className="space-y-6">
            {storyboard.hook && (
              <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <SparklesIcon className="h-4 w-4" aria-hidden /> Opening hook (first 3 seconds)
                  </h2>
                  {copyButton(storyboard.hook, "main-hook")}
                </div>
                <p className="text-base sm:text-lg font-bold text-foreground leading-snug">“{storyboard.hook}”</p>
              </div>
            )}

            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scene by scene</h2>
              <span className="text-xs text-muted-foreground font-medium">{scenes.length} scenes</span>
            </div>

            {scenes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No scenes yet.</p>
            ) : (
              <ol className="space-y-4">
                {scenes.map((s, idx) => {
                  const whatToRecord = s.what_to_show || s.what_to_record || s.broll || "Record the main subject"
                  const voiceover = s.voiceover_example || s.what_to_say || s.script_segment || ""
                  const time = sceneTime(s)
                  return (
                    <li key={s.id || idx} className="rounded-3xl border border-border bg-card p-6 space-y-5 shadow-xs">
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/60 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-xl bg-primary text-primary-foreground font-black text-xs flex items-center justify-center" aria-hidden>
                            {s.scene_number || idx + 1}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-foreground">
                            {s.title || `Scene ${s.scene_number || idx + 1}`}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {time && (
                            <Badge variant="outline" className="text-[11px] font-semibold border-border text-foreground/80">
                              <ClockIcon className="h-3 w-3 mr-1 inline text-primary" aria-hidden />
                              <span>{time}</span>
                            </Badge>
                          )}
                          {s.camera_angle && (
                            <Badge variant="secondary" className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border-none">
                              <CameraIcon className="h-3 w-3 mr-1 inline" aria-hidden />
                              {s.camera_angle}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5 bg-secondary/30 p-4 rounded-2xl border border-border/50">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                          <FilmIcon className="h-3.5 w-3.5 text-primary" aria-hidden /> What to record
                        </h4>
                        <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-wrap">{whatToRecord}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                              <VoiceIcon className="h-3.5 w-3.5 text-primary" aria-hidden /> What to say
                            </h4>
                            {voiceover && copyButton(voiceover, `vo-${s.id || idx}`)}
                          </div>
                          <p className="text-sm font-semibold text-foreground italic leading-relaxed pt-1">
                            {voiceover ? `“${voiceover}”` : "No voiceover: let the visuals and music carry this beat."}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary/20 border border-border/60 space-y-3">
                          <div className="space-y-1">
                            <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">On-screen text</h4>
                            <p className="text-sm font-bold text-foreground">{s.onscreen_text || "None"}</p>
                          </div>
                          {(s.camera_movement || s.lighting) && (
                            <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2 text-xs text-muted-foreground flex-wrap">
                              {s.camera_movement && <span>Camera: <strong className="text-foreground">{s.camera_movement}</strong></span>}
                              {s.lighting && <span>Light: <strong className="text-foreground">{s.lighting}</strong></span>}
                            </div>
                          )}
                        </div>
                      </div>

                      {s.tips && (
                        <div className="flex items-start gap-2.5 text-sm text-muted-foreground bg-primary/5 border border-primary/15 p-3 rounded-xl">
                          <LightBulbIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
                          <p className="leading-relaxed"><strong className="text-foreground">Tip:</strong> {s.tips}</p>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            )}
          </div>
        )}

        {activeTab === "script" && (
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border gap-3">
              <div>
                <h2 className="text-lg font-bold text-foreground">Full script</h2>
                <p className="text-xs text-muted-foreground font-medium">Every scene&apos;s lines, in order.</p>
              </div>
              {storyboard.script && (
                <Button size="sm" onClick={() => copyToClipboard(storyboard.script || "", "script-tab")}
                  className="rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5">
                  {copiedKey === "script-tab" ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  Copy script
                </Button>
              )}
            </div>
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/60">
              <p className="text-base sm:text-lg font-medium text-foreground leading-loose whitespace-pre-wrap">
                {storyboard.script || "No script for this plan. You can shoot from the scenes."}
              </p>
            </div>
          </section>
        )}

        {activeTab === "shotlist" && (
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border gap-3">
              <div>
                <h2 className="text-lg font-bold text-foreground">Shot checklist</h2>
                <p className="text-xs text-muted-foreground font-medium">Tick off each shot as you record it.</p>
              </div>
              <span className="text-xs font-bold text-primary" aria-live="polite">{recorded} of {scenes.length} recorded</span>
            </div>
            <ul className="divide-y divide-border">
              {scenes.map((s, idx) => {
                const key = s.id || `shot-${idx}`
                const checked = !!checkedShots[key]
                return (
                  <li key={key}>
                    <label htmlFor={`shot-${key}`}
                      className={`py-4 px-3 flex items-start gap-4 cursor-pointer rounded-xl transition-colors ${checked ? "opacity-60 bg-secondary/30" : "hover:bg-secondary/40"}`}>
                      <input id={`shot-${key}`} type="checkbox" checked={checked}
                        onChange={() => setCheckedShots((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className="mt-1 h-4 w-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-primary" />
                      <span className={`space-y-1 flex-1 ${checked ? "line-through" : ""}`}>
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-black text-foreground">Shot {s.scene_number || idx + 1}</span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {sceneTime(s) ? `(${sceneTime(s)})` : ""}{s.camera_angle ? ` · ${s.camera_angle}` : ""}
                          </span>
                        </span>
                        <span className="block text-sm font-semibold text-foreground">{s.what_to_show || s.what_to_record || "Record scene"}</span>
                        {s.voiceover_example && (
                          <span className="block text-xs text-muted-foreground italic">Say: “{s.voiceover_example}”</span>
                        )}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {activeTab === "audio" && (
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Music ideas</h2>
              <p className="text-xs text-muted-foreground font-medium">
                Style references to match the energy of this shoot. Check that a track is available and licensed before you use it.
              </p>
            </div>
            {music.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No music ideas were generated for this plan.</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {music.map((m, idx) => {
                  const song = m.song_name || m.genre || "Suggested track"
                  const artist = m.artist || ""
                  return (
                    <li key={m.id || idx} className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-3 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          {m.genre && <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">{m.genre}</span>}
                          {m.verified === false && (
                            <span className="text-[11px] font-semibold rounded-md px-1.5 py-0.5 bg-amber-500/15 text-amber-800 dark:text-amber-200">
                              Style reference, not verified
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-foreground">{song}</h3>
                        {artist && <p className="text-xs text-muted-foreground font-medium">{artist}</p>}
                        {m.why_fits && <p className="text-sm text-foreground/85 pt-1 leading-relaxed">{m.why_fits}</p>}
                        {m.best_scene && <p className="text-xs text-muted-foreground">Best for: {m.best_scene}</p>}
                        {m.royalty_free_alt && <p className="text-xs text-muted-foreground">Royalty-free option: {m.royalty_free_alt}</p>}
                        {m.licensing_note && <p className="text-xs text-muted-foreground italic">{m.licensing_note}</p>}
                      </div>
                      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">{m.mood ? `Mood: ${m.mood}` : ""}</span>
                        <a href={`https://open.spotify.com/search/${encodeURIComponent(`${song} ${artist}`.trim())}`}
                          target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary hover:underline">
                          Search on Spotify<span className="sr-only"> (opens in a new tab)</span> →
                        </a>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}

        {activeTab === "captions" && (
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
              <div className="pb-3 border-b border-border">
                <h2 className="text-lg font-bold text-foreground">Captions</h2>
                <p className="text-xs text-muted-foreground font-medium">Pick the one that fits your channel.</p>
              </div>
              {!storyboard.captions || storyboard.captions.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">No captions were generated for this plan.</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {storyboard.captions.map((c: { id?: string; caption: string }, idx: number) => (
                    <li key={c.id || idx} className="p-5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">Option {idx + 1}</h3>
                        <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-wrap">{c.caption}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(c.caption, `cap-${idx}`)}
                        className="w-full rounded-xl text-xs font-bold border-border hover:bg-secondary gap-1.5">
                        {copiedKey === `cap-${idx}` ? <Check className="h-3 w-3" aria-hidden /> : <Copy className="h-3 w-3" aria-hidden />}
                        Copy caption {idx + 1}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="text-base font-bold text-foreground">Hashtags</h2>
                {storyboard.hashtags && storyboard.hashtags.length > 0 &&
                  copyButton(storyboard.hashtags.map((h: { hashtag: string }) => h.hashtag).join(" "), "all-tags", "Copy all")}
              </div>
              {!storyboard.hashtags || storyboard.hashtags.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hashtags were generated for this plan.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {storyboard.hashtags.map((h: { id?: string; hashtag: string }, idx: number) => (
                    <li key={h.id || idx}>
                      <button type="button" onClick={() => copyToClipboard(h.hashtag, `tag-${idx}`)}
                        aria-label={`Copy ${h.hashtag}`}
                        className="bg-secondary/60 hover:bg-secondary text-foreground text-xs font-semibold px-3 py-1.5 rounded-xl border border-border/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        {h.hashtag}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {activeTab === "tips" && (
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Posting tips</h2>
              <p className="text-xs text-muted-foreground font-medium">
                AI suggestions based on general patterns, not live platform data.
              </p>
            </div>
            {trends.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No posting tips were generated for this plan.</p>
            ) : (
              trends.map((t, idx) => (
                <dl key={t.id || idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.posting_time && <Tip label="When to post" value={t.posting_time} />}
                  {t.editing_style && <Tip label="Editing style" value={t.editing_style} />}
                  {t.content_gap && <Tip label="A gap you can fill" value={t.content_gap} />}
                  {t.transitions && t.transitions.length > 0 && <Tip label="Transitions to try" value={t.transitions.join(", ")} />}
                  {t.sounds && t.sounds.length > 0 && <Tip label="Sound ideas" value={t.sounds.join(", ")} />}
                </dl>
              ))
            )}
          </section>
        )}

        {activeTab === "repurpose" && (
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Repurpose</h2>
              <p className="text-xs text-muted-foreground font-medium">Written posts made from this video idea.</p>
            </div>
            {REPURPOSE_FORMATS.every((f) => !repurpose[f.key]?.trim()) ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No repurposed posts were generated for this plan.
              </p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {REPURPOSE_FORMATS.map((f) => {
                  const text = repurpose[f.key]?.trim()
                  return (
                    <li key={f.key} className="p-6 rounded-2xl bg-secondary/30 border border-border/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{f.label}</h3>
                        {text && copyButton(text, `rp-${f.key}`, `Copy ${f.label.toLowerCase()}`)}
                      </div>
                      {text ? (
                        <p className="p-4 rounded-xl bg-card border border-border text-sm leading-relaxed text-foreground whitespace-pre-wrap">{text}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">{f.empty}</p>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

function CopyTextButton({ copied, label, onCopy }: { copied: boolean; label: string; onCopy: () => void }) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="text-xs font-bold text-primary hover:underline flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {copied ? <Check className="h-3 w-3" aria-hidden /> : <Copy className="h-3 w-3" aria-hidden />}
      {label}
    </button>
  )
}

function Tip({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-1">
      <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground leading-relaxed">{value}</dd>
    </div>
  )
}
