'use client'

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  HiSparkles as Sparkles,
  HiAdjustmentsHorizontal as Sliders,
  HiArrowPath as Loader2,
  HiCheckCircle as CheckCircle2,
  HiExclamationCircle as AlertCircle,
  HiFilm as Film,
  HiArrowRight as ArrowRight
} from "react-icons/hi2"
import { toast } from "sonner"
import { storyboardService } from "@/services/storyboardService"

const durationOptions = [
  { label: "15 sec", value: "15" },
  { label: "30 sec", value: "30" },
  { label: "60 sec", value: "60" },
  { label: "90 sec", value: "90" },
]

const platformOptions = [
  { label: "Instagram Reel", value: "reels" },
  { label: "TikTok", value: "tiktok" },
  { label: "YouTube Short", value: "shorts" },
]

const styleOptions = [
  { label: "Talking Head", value: "talking_head" },
  { label: "Educational / Breakdown", value: "educational" },
  { label: "POV / Vlog", value: "pov" },
  { label: "Storytelling", value: "storytelling" },
]

const goalOptions = [
  { label: "Inspire & Motivate", value: "inspire" },
  { label: "Educate & Inform", value: "educate" },
  { label: "Entertain & Hook", value: "entertain" },
  { label: "Convert & Sell", value: "convert" },
]

const toneOptions = [
  { label: "Energetic & Bold", value: "energetic" },
  { label: "Calm & Thoughtful", value: "calm" },
  { label: "Direct & Authoritative", value: "authoritative" },
  { label: "Casual & Relatable", value: "relatable" },
]

function CreateStoryboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Core Prompt Inputs
  const [idea, setIdea] = useState("")
  const [duration, setDuration] = useState("30")
  const [platform, setPlatform] = useState("reels")
  const [contentStyle, setContentStyle] = useState("talking_head")
  
  // Advanced / Progressive Disclosure
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [goal, setGoal] = useState("educate")
  const [tone, setTone] = useState("energetic")
  const [audience, setAudience] = useState("")
  const [language, setLanguage] = useState("English")

  // Generation Job State
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const [jobProgress, setJobProgress] = useState(0)
  const [jobStatus, setJobStatus] = useState<"pending" | "processing" | "completed" | "failed" | null>(null)
  const [jobStage, setJobStage] = useState("Connecting to AI Director...")
  const [jobError, setJobError] = useState<string | null>(null)
  const [createdStoryboardId, setCreatedStoryboardId] = useState<string | null>(null)

  // Pre-fill from query param
  useEffect(() => {
    const queryIdea = searchParams.get("idea")
    if (queryIdea) {
      setIdea(queryIdea)
    }
  }, [searchParams])

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!idea.trim()) {
      toast.error("Please provide a video idea or topic to begin.")
      return
    }

    setIsGenerating(true)
    setJobStatus("pending")
    setJobProgress(15)
    setJobError(null)
    setJobStage("Analyzing video concept & crafting viral hook...")

    try {
      const response = await storyboardService.generateAIStoryboard({
        idea: idea.trim(),
        goal,
        tone,
        style: contentStyle,
        audience: audience.trim() || "Target viewers interested in this niche",
        duration: parseInt(duration),
        platform,
        language,
      })

      setJobId(response.job_id)
      setCreatedStoryboardId(response.storyboard_id)
      setJobStatus("pending")
      setJobStage("Structuring scene timeline & camera directions...")
    } catch (error: any) {
      console.error("Failed to start generation:", error)
      setJobStatus("failed")
      setJobError(error.response?.data?.detail || error.message || "Failed to start generation job.")
      setIsGenerating(false)
    }
  }

  // Polling Job Status
  useEffect(() => {
    if (!jobId || jobStatus === "completed" || jobStatus === "failed") return

    let intervalId: NodeJS.Timeout

    const checkStatus = async () => {
      try {
        const job = await storyboardService.getJobStatus(jobId)
        setJobStatus(job.status as any)

        if (job.status === "processing") {
          setJobProgress((prev) => Math.min(prev + 15, 85))
          if (job.stage) {
            setJobStage(job.stage)
          } else {
            setJobStage("Writing voiceover script, audio cues, and B-roll notes...")
          }
        }

        if (job.status === "completed") {
          setJobProgress(100)
          setJobStage("Shoot plan ready!")
          toast.success("Shoot plan created successfully!")
          
          setTimeout(() => {
            const targetId = createdStoryboardId || (job.result && job.result.id)
            if (targetId) {
              router.push(`/dashboard/storyboards/${targetId}`)
            } else {
              router.push("/dashboard/storyboards")
            }
          }, 800)
        } else if (job.status === "failed") {
          setJobError(job.error_message || "Generation failed. Please try again.")
          setIsGenerating(false)
          toast.error("Generation failed.")
        }
      } catch (err: any) {
        console.error("Polling error", err)
      }
    }

    intervalId = setInterval(checkStatus, 2000)
    return () => clearInterval(intervalId)
  }, [jobId, jobStatus, createdStoryboardId, router])

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 select-none">
      
      {/* ── Page Header ── */}
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Creator Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          What are you thinking about?
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Tell Grovii your idea. Get a complete, camera-ready shoot plan in seconds.
        </p>
      </div>

      {/* ── Active Generation Modal / Overlay ── */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-3xl border border-primary/20 bg-card p-8 sm:p-10 shadow-lg text-center space-y-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center animate-pulse">
              <Sparkles className="h-7 w-7" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-foreground">
                Grovii is directing your shoot...
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                {jobStage}
              </p>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-full max-w-md mx-auto h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "10%" }}
                animate={{ width: `${jobProgress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {jobError && (
              <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{jobError}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Prompt Form ── */}
      {!isGenerating && (
        <form onSubmit={handleGenerate} className="space-y-6">
          
          {/* Main Idea Input */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
            <div className="space-y-2">
              <label htmlFor="idea-input" className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Your Video Idea
              </label>
              <textarea
                id="idea-input"
                rows={4}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. 3 high-leverage habits that boosted my output as a solo creator, focusing on morning focus blocks and batching..."
                className="w-full p-4 rounded-2xl bg-secondary/40 border border-border focus:border-primary/40 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 transition-all resize-none leading-relaxed"
                autoFocus
              />
            </div>

            {/* Quick Pill Controls */}
            <div className="space-y-4 pt-2 border-t border-border/60">
              
              {/* Duration Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Target Duration
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {durationOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDuration(opt.value)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        duration === opt.value
                          ? "bg-primary text-primary-foreground shadow-xs font-bold"
                          : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Platform
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {platformOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPlatform(opt.value)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        platform === opt.value
                          ? "bg-primary text-primary-foreground shadow-xs font-bold"
                          : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format / Style Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Video Style
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {styleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setContentStyle(opt.value)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        contentStyle === opt.value
                          ? "bg-primary text-primary-foreground shadow-xs font-bold"
                          : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Progressive Disclosure: Customize Accordion */}
            <div className="pt-3 border-t border-border/60">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors py-1"
              >
                <Sliders className="h-3.5 w-3.5 text-primary" />
                <span>{showAdvanced ? "Hide Extra Customization" : "Customize (Audience, Goal, Tone & Language)"}</span>
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pt-4 space-y-4 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Target Audience */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Target Audience
                        </label>
                        <input
                          type="text"
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          placeholder="e.g. Solo founders, creators, agency owners..."
                          className="w-full h-10 px-3 rounded-xl bg-secondary/50 border border-border text-xs text-foreground focus:outline-none focus:border-primary/40"
                        />
                      </div>

                      {/* Language */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-secondary/50 border border-border text-xs text-foreground focus:outline-none focus:border-primary/40"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi / Hinglish</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                        </select>
                      </div>

                      {/* Goal */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Primary Goal
                        </label>
                        <select
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-secondary/50 border border-border text-xs text-foreground focus:outline-none focus:border-primary/40"
                        >
                          {goalOptions.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Tone */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
                          Speaking Tone
                        </label>
                        <select
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-secondary/50 border border-border text-xs text-foreground focus:outline-none focus:border-primary/40"
                        >
                          {toneOptions.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Primary Action Submit Bar */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={!idea.trim() || isGenerating}
              className="rounded-2xl h-12 px-8 bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 disabled:opacity-50 gap-2 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Shoot Plan</span>
            </Button>
          </div>

        </form>
      )}

    </div>
  )
}

export default function CreateStoryboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    }>
      <CreateStoryboardContent />
    </Suspense>
  )
}
