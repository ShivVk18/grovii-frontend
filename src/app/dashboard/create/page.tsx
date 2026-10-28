'use client'

import React, { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  HiSparkles as Sparkles,
  HiAdjustmentsHorizontal as Sliders,
  HiExclamationCircle as AlertCircle,
} from "react-icons/hi2"
import { storyboardService } from "@/services/storyboardService"
import { apiErrorMessage, fieldErrors } from "@/lib/apiErrors"
import { GenerationProgress } from "@/components/create/GenerationProgress"

// Limits mirror the backend validators (src/Schemas/storyboard_schema.py).
const IDEA_MIN = 10
const IDEA_MAX = 1000
const AUDIENCE_MAX = 200
const CONSTRAINT_MAX = 120

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

const languageOptions = [
  { label: "English", value: "English" },
  { label: "Hinglish (Hindi in Roman letters)", value: "Hinglish" },
  { label: "Hindi (Devanagari)", value: "Hindi" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
]

/** Fields that live in the collapsible "Customize" section. */
const ADVANCED_FIELDS = ["audience", "language", "goal", "tone", "faceless", "location", "equipment"]

type Errors = Record<string, string>

const inputClass = (invalid: boolean) =>
  `w-full h-10 px-3 rounded-xl bg-secondary/50 border text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
    invalid ? "border-destructive" : "border-border focus:border-primary/40"
  }`

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return <p id={id} className="text-xs font-semibold text-destructive mt-1">{message}</p>
}

function PillGroup({ label, options, value, onChange }: {
  label: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  const id = `pill-${label.toLowerCase().replace(/\W+/g, "-")}`
  return (
    <div className="space-y-1.5">
      <span id={id} className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{label}</span>
      <div role="group" aria-labelledby={id} className="flex items-center gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              value === opt.value
                ? "bg-primary text-primary-foreground shadow-xs font-bold"
                : "bg-secondary/60 hover:bg-secondary text-foreground/80 hover:text-foreground border border-border/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function CreateForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [idea, setIdea] = useState(() => (searchParams.get("idea") || "").slice(0, IDEA_MAX))
  const [duration, setDuration] = useState("30")
  const [platform, setPlatform] = useState("reels")
  const [contentStyle, setContentStyle] = useState("talking_head")

  const [showAdvanced, setShowAdvanced] = useState(false)
  const [goal, setGoal] = useState("educate")
  const [tone, setTone] = useState("energetic")
  const [audience, setAudience] = useState("")
  const [language, setLanguage] = useState("English")
  const [faceless, setFaceless] = useState(false)
  const [location, setLocation] = useState("")
  const [equipment, setEquipment] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState<string | null>(null)

  const showErrors = (next: Errors, message: string | null) => {
    setErrors(next)
    setFormError(message)
    if (Object.keys(next).some((f) => ADVANCED_FIELDS.includes(f))) setShowAdvanced(true)
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = idea.trim()
    if (text.length < IDEA_MIN) {
      showErrors({ idea: `Idea must be at least ${IDEA_MIN} characters.` }, null)
      document.getElementById("idea-input")?.focus()
      return
    }
    showErrors({}, null)
    setSubmitting(true)
    try {
      const response = await storyboardService.generateAIStoryboard({
        idea: text,
        goal,
        tone,
        style: contentStyle,
        audience: audience.trim() || "People interested in this topic",
        duration: parseInt(duration, 10),
        platform,
        language,
        faceless,
        ...(location.trim() ? { location: location.trim() } : {}),
        ...(equipment.trim() ? { equipment: equipment.trim() } : {}),
      })
      // The id goes in the URL so a refresh resumes instead of starting over.
      router.push(`/dashboard/create?job=${response.job_id}`)
    } catch (error) {
      const fields = fieldErrors(error)
      const hasFields = Object.keys(fields).length > 0
      showErrors(fields, hasFields ? "Please fix the highlighted fields." : apiErrorMessage(error, "Couldn't start your shoot plan. Please try again."))
      setSubmitting(false)
    }
  }

  const err = (f: string) => errors[f]
  const described = (f: string) => (errors[f] ? { "aria-invalid": true as const, "aria-describedby": `${f}-error` } : {})

  return (
    <form onSubmit={handleGenerate} className="space-y-6" noValidate>
      {formError && (
        <div role="alert" className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          <span>{formError}</span>
        </div>
      )}

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
        <div className="space-y-2">
          <label htmlFor="idea-input" className="text-xs font-bold text-foreground uppercase tracking-wider block">
            Your video idea
          </label>
          <textarea
            id="idea-input"
            rows={4}
            value={idea}
            maxLength={IDEA_MAX}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. 3 habits that boosted my output as a solo creator, focusing on morning focus blocks and batching..."
            className={`w-full p-4 rounded-2xl bg-secondary/40 border focus:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 text-sm sm:text-base text-foreground placeholder:text-muted-foreground transition-all resize-none leading-relaxed ${
              err("idea") ? "border-destructive" : "border-border focus:border-primary/40"
            }`}
            autoFocus
            {...described("idea")}
          />
          <FieldError id="idea-error" message={err("idea")} />
        </div>

        <div className="space-y-4 pt-2 border-t border-border/60">
          <PillGroup label="Target duration" options={durationOptions} value={duration} onChange={setDuration} />
          <FieldError id="duration-error" message={err("duration")} />
          <PillGroup label="Platform" options={platformOptions} value={platform} onChange={setPlatform} />
          <FieldError id="platform-error" message={err("platform")} />
          <PillGroup label="Video style" options={styleOptions} value={contentStyle} onChange={setContentStyle} />
          <FieldError id="style-error" message={err("style")} />
        </div>

        <div className="pt-3 border-t border-border/60">
          <button
            type="button"
            aria-expanded={showAdvanced}
            aria-controls="advanced-options"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Sliders className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>{showAdvanced ? "Hide extra options" : "Customize (audience, goal, tone, language, how you film)"}</span>
          </button>

          <AnimatePresence initial={false}>
            {showAdvanced && (
              <motion.div
                id="advanced-options"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-4 space-y-4 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="audience" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Who it&apos;s for</label>
                    <input id="audience" type="text" value={audience} maxLength={AUDIENCE_MAX}
                      onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Solo founders, new creators..."
                      className={inputClass(!!err("audience"))} {...described("audience")} />
                    <FieldError id="audience-error" message={err("audience")} />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="language" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Language</label>
                    <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}
                      className={inputClass(!!err("language"))} {...described("language")}>
                      {languageOptions.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                    <FieldError id="language-error" message={err("language")} />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="goal" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Main goal</label>
                    <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}
                      className={inputClass(!!err("goal"))} {...described("goal")}>
                      {goalOptions.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                    <FieldError id="goal-error" message={err("goal")} />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="tone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Speaking tone</label>
                    <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}
                      className={inputClass(!!err("tone"))} {...described("tone")}>
                      {toneOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <FieldError id="tone-error" message={err("tone")} />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="location" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Where you&apos;ll film (optional)</label>
                    <input id="location" type="text" value={location} maxLength={CONSTRAINT_MAX}
                      onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Small apartment kitchen"
                      className={inputClass(!!err("location"))} {...described("location")} />
                    <FieldError id="location-error" message={err("location")} />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="equipment" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Your gear (optional)</label>
                    <input id="equipment" type="text" value={equipment} maxLength={CONSTRAINT_MAX}
                      onChange={(e) => setEquipment(e.target.value)} placeholder="e.g. Phone and a tripod"
                      className={inputClass(!!err("equipment"))} {...described("equipment")} />
                    <FieldError id="equipment-error" message={err("equipment")} />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input id="faceless" type="checkbox" checked={faceless} onChange={(e) => setFaceless(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-primary"
                    {...described("faceless")} />
                  <label htmlFor="faceless" className="text-sm text-foreground">
                    Faceless video <span className="text-muted-foreground">(no face on camera: hands, objects, screens)</span>
                  </label>
                </div>
                <FieldError id="faceless-error" message={err("faceless")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button type="button" variant="ghost" onClick={() => router.push("/dashboard")}
          className="rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground">
          Cancel
        </Button>
        <Button type="submit" disabled={!idea.trim() || submitting}
          className="rounded-2xl h-12 px-8 bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 disabled:opacity-50 gap-2 transition-all">
          <Sparkles className="h-4 w-4" aria-hidden />
          <span>{submitting ? "Starting…" : "Generate shoot plan"}</span>
        </Button>
      </div>
    </form>
  )
}

function CreateStoryboardContent() {
  const jobId = useSearchParams().get("job")
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Creator Studio</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          {jobId ? "Your shoot plan is on its way" : "What are you thinking about?"}
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Tell Grovii your idea. Get a complete, camera-ready shoot plan.
        </p>
      </div>
      {jobId ? <GenerationProgress key={jobId} jobId={jobId} /> : <CreateForm />}
    </div>
  )
}

export default function CreateStoryboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-label="Loading">
        <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <CreateStoryboardContent />
    </Suspense>
  )
}
