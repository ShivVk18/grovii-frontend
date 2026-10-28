'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  HiSparkles as Sparkles,
  HiExclamationCircle as AlertCircle,
  HiSignalSlash as Offline,
} from "react-icons/hi2"
import { Button } from "@/components/ui/button"
import { storyboardService } from "@/services/storyboardService"
import { useJobPolling } from "@/hooks/useJobPolling"
import { apiErrorMessage, statusOf } from "@/lib/apiErrors"
import { displayProgress, stageFor } from "@/lib/generationProgress"
import { supportLine } from "@/lib/support"

/**
 * Follows one generation by its id from the URL (?job=...), so a refresh or a
 * closed tab can come back to it. Never shows ids or internal terms.
 */
export function GenerationProgress({ jobId }: { jobId: string }) {
  const router = useRouter()
  const { job, notFound, unreachable, timedOut, checkNow } = useJobPolling(jobId)
  const [actionError, setActionError] = useState<string | null>(null)
  const [busy, setBusy] = useState<"retry" | "cancel" | null>(null)

  const status = job?.status ?? null
  const progress = job?.progress ?? 0

  useEffect(() => {
    if (status !== "completed" || !job) return
    toast.success("Your shoot plan is ready!")
    const t = setTimeout(() => router.replace(`/dashboard/storyboards/${job.storyboard_id}`), 600)
    return () => clearTimeout(t)
  }, [status, job, router])

  const retry = async () => {
    if (!job) return
    setBusy("retry")
    setActionError(null)
    try {
      const next = await storyboardService.regenerateFrom(job.storyboard_id)
      router.replace(`/dashboard/create?job=${next.job_id}`)
    } catch (error) {
      setActionError(apiErrorMessage(error, "Couldn't start a new try. Please try again."))
    } finally {
      setBusy(null)
    }
  }

  const cancel = async () => {
    setBusy("cancel")
    setActionError(null)
    try {
      await storyboardService.cancelJob(jobId)
    } catch (error) {
      // 409: it already started, so it can't be cancelled any more.
      setActionError(statusOf(error) === 409
        ? "It has already started, so it can't be cancelled now."
        : apiErrorMessage(error))
    } finally {
      setBusy(null)
      checkNow()
    }
  }

  if (notFound) {
    return (
      <Panel>
        <div role="alert" className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">We couldn&apos;t find that generation</h2>
          <p className="text-sm text-muted-foreground">It may belong to another account or have been removed.</p>
        </div>
        <Button asChild className="rounded-xl"><Link href="/dashboard/create">Start a new shoot plan</Link></Button>
      </Panel>
    )
  }

  if (status === "failed" || status === "cancelled") {
    return (
      <Panel>
        <div role="alert" className="space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
            <AlertCircle className="h-7 w-7" aria-hidden />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {status === "cancelled" ? "Generation cancelled" : "This shoot plan couldn't be finished"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {job?.error_message || "Something went wrong while generating. Please try again."}
          </p>
          {actionError && <p className="text-sm font-semibold text-destructive">{actionError}</p>}
          <p className="text-xs text-muted-foreground">{supportLine()}</p>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button onClick={retry} disabled={busy !== null} className="rounded-xl font-bold">
            {busy === "retry" ? "Starting…" : "Try again"}
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/dashboard/create">Start a new idea</Link>
          </Button>
        </div>
      </Panel>
    )
  }

  const stage = stageFor(status, progress)
  const shown = displayProgress(status, progress)

  return (
    <Panel>
      <div role="status" aria-live="polite" className="space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center motion-safe:animate-pulse">
          <Sparkles className="h-7 w-7" aria-hidden />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-xl font-bold text-foreground">Creating your shoot plan</h2>
          <p className="text-sm text-muted-foreground font-medium">{status === "completed" ? "Opening your shoot plan…" : stage}</p>
        </div>
        <div
          className="w-full max-w-md mx-auto h-2 bg-secondary rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Shoot plan progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shown}
        >
          <motion.div className="h-full bg-primary" initial={{ width: "5%" }} animate={{ width: `${shown}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }} />
        </div>
        {!timedOut && (
          <p className="text-xs text-muted-foreground">This usually takes about a minute. You can leave this page and come back.</p>
        )}
      </div>

      {unreachable && !timedOut && (
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 flex items-center justify-center gap-1.5">
          <Offline className="h-4 w-4" aria-hidden /> Having trouble reaching Grovii. We&apos;ll keep trying.
        </p>
      )}

      {timedOut && (
        <div className="space-y-3 max-w-md mx-auto">
          <p className="text-sm text-foreground">
            This is taking longer than usual, but it&apos;s still working. Keep waiting here, or check your
            storyboards later. It will appear there when it&apos;s ready.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button onClick={checkNow} className="rounded-xl font-bold">Keep waiting</Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/dashboard/storyboards">Check later in My Storyboards</Link>
            </Button>
          </div>
        </div>
      )}

      {(status === "queued" || status === null) && !timedOut && (
        <div className="space-y-2">
          <Button variant="ghost" onClick={cancel} disabled={busy !== null || status === null}
            className="rounded-xl text-xs text-muted-foreground">
            {busy === "cancel" ? "Cancelling…" : "Cancel generation"}
          </Button>
          {actionError && <p className="text-xs font-semibold text-destructive">{actionError}</p>}
        </div>
      )}
    </Panel>
  )
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-primary/20 bg-card p-8 sm:p-10 shadow-lg text-center space-y-6">
      {children}
    </div>
  )
}
