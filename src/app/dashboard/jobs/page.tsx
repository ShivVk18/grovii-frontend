'use client'

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  HiSparkles as Sparkles,
  HiArrowPath as Refresh,
  HiCheckCircle as Done,
  HiXCircle as Failed,
  HiClock as Waiting,
  HiNoSymbol as Cancelled,
} from "react-icons/hi2"
import { storyboardService, type JobListItem } from "@/services/storyboardService"
import { apiErrorMessage } from "@/lib/apiErrors"
import { stageFor } from "@/lib/generationProgress"
import type { JobStatus } from "@/types"

const STATUS: Record<JobStatus, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  queued: { label: "Waiting to start", icon: Waiting, tone: "text-amber-800 dark:text-amber-200 bg-amber-500/15" },
  running: { label: "Generating", icon: Sparkles, tone: "text-primary bg-primary/10" },
  completed: { label: "Ready", icon: Done, tone: "text-emerald-800 dark:text-emerald-200 bg-emerald-500/15" },
  failed: { label: "Failed", icon: Failed, tone: "text-red-800 dark:text-red-200 bg-red-500/15" },
  cancelled: { label: "Cancelled", icon: Cancelled, tone: "text-foreground/80 bg-secondary" },
}

function took(job: JobListItem): string | null {
  if (!job.completed_at) return null
  const start = new Date(job.started_at || job.created_at || job.completed_at).getTime()
  const secs = Math.max(0, Math.round((new Date(job.completed_at).getTime() - start) / 1000))
  return secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}m ${secs % 60}s`
}

export default function GenerationHistoryPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<JobListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState<string | null>(null)
  const [retryError, setRetryError] = useState<Record<string, string>>({})

  const fetchJobs = useCallback(async () => {
    try {
      setJobs(await storyboardService.getJobs())
      setError(null)
    } catch (e) {
      setError(apiErrorMessage(e, "We couldn't load your generations."))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchJobs()
  }, [fetchJobs])

  // Refresh while something is still generating.
  const hasActive = jobs.some((j) => j.status === "queued" || j.status === "running")
  useEffect(() => {
    if (!hasActive) return
    const t = setInterval(() => void fetchJobs(), 5000)
    return () => clearInterval(t)
  }, [hasActive, fetchJobs])

  const retry = async (job: JobListItem) => {
    setRetrying(job.id)
    setRetryError((r) => ({ ...r, [job.id]: "" }))
    try {
      const next = await storyboardService.regenerateFrom(job.storyboard_id)
      router.push(`/dashboard/create?job=${next.job_id}`)
    } catch (e) {
      setRetryError((r) => ({ ...r, [job.id]: apiErrorMessage(e, "Couldn't start a new try.") }))
      setRetrying(null)
    }
  }

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" aria-hidden /> Your generations
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Every shoot plan you asked Grovii to create, newest first.</p>
        </div>
        <Button variant="outline" onClick={() => { setLoading(true); void fetchJobs() }} disabled={loading}
          className="rounded-xl border-border gap-2 font-semibold">
          <Refresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden /> Refresh
        </Button>
      </div>

      {loading && jobs.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-3" role="status">
          <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" aria-hidden />
          <p className="text-sm font-semibold text-muted-foreground">Loading your generations…</p>
        </div>
      ) : error && jobs.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <p role="alert" className="text-sm font-semibold text-foreground">{error}</p>
          <Button onClick={() => { setLoading(true); void fetchJobs() }} className="rounded-xl">Try again</Button>
        </div>
      ) : jobs.length === 0 ? (
        <div className="py-16 text-center space-y-3 rounded-3xl border border-dashed border-border">
          <p className="text-base font-bold text-foreground">No generations yet</p>
          <p className="text-sm text-muted-foreground">Your shoot plans will show up here while they&apos;re created.</p>
          <Button asChild className="rounded-xl"><Link href="/dashboard/create">Create a shoot plan</Link></Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => {
            const s = STATUS[job.status] ?? STATUS.failed
            const Icon = s.icon
            const time = took(job)
            const active = job.status === "queued" || job.status === "running"
            return (
              <li key={job.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${s.tone}`}>
                      <Icon className="h-3.5 w-3.5" aria-hidden /> {s.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {job.created_at ? new Date(job.created_at).toLocaleString() : ""}
                      {time ? ` · took ${time}` : ""}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground truncate">{job.storyboard_title || "Untitled shoot plan"}</p>
                  {active && <p className="text-xs text-muted-foreground">{stageFor(job.status, job.progress)}</p>}
                  {(job.status === "failed" || job.status === "cancelled") && job.error_message && (
                    <p className="text-xs text-muted-foreground">{job.error_message}</p>
                  )}
                  {retryError[job.id] && <p role="alert" className="text-xs font-semibold text-destructive">{retryError[job.id]}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {job.status === "completed" && (
                    <Button asChild size="sm" className="rounded-xl font-bold">
                      <Link href={`/dashboard/storyboards/${job.storyboard_id}`}>Open plan</Link>
                    </Button>
                  )}
                  {active && (
                    <Button asChild size="sm" variant="outline" className="rounded-xl">
                      <Link href={`/dashboard/create?job=${job.id}`}>See progress</Link>
                    </Button>
                  )}
                  {(job.status === "failed" || job.status === "cancelled") && (
                    <Button size="sm" onClick={() => retry(job)} disabled={retrying !== null} className="rounded-xl font-bold">
                      {retrying === job.id ? "Starting…" : "Try again"}
                    </Button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
