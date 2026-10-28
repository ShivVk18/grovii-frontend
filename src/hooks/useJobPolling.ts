import { useCallback, useEffect, useState } from "react";
import { storyboardService, type JobStatusResponse } from "@/services/storyboardService";
import { statusOf } from "@/lib/apiErrors";
import {
  CLIENT_TIMEOUT_MS, FINISHED, OFFLINE_AFTER_FAILURES, nextPollDelay,
} from "@/lib/generationProgress";

export interface JobPollState {
  job: JobStatusResponse | null;
  /** The job does not exist or belongs to someone else. */
  notFound: boolean;
  /** Several checks in a row got no answer; we keep trying. */
  unreachable: boolean;
  /** Polling paused after CLIENT_TIMEOUT_MS; the job itself keeps running. */
  timedOut: boolean;
  /** Resume after a timeout, or check right now. */
  checkNow: () => void;
}

/**
 * Follows one generation. Starts at 2s between checks and slows to 10s, stops
 * when the job finishes, and pauses after 5 minutes so an idle tab doesn't poll
 * forever. Survives refresh because the job id comes from the URL.
 */
export function useJobPolling(jobId: string | null): JobPollState {
  const [job, setJob] = useState<JobStatusResponse | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [unreachable, setUnreachable] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (!jobId) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempt = 0;
    let failures = 0;
    const started = Date.now();

    const tick = async () => {
      try {
        const next = await storyboardService.getJobStatus(jobId);
        if (stopped) return;
        failures = 0;
        setUnreachable(false);
        setJob(next);
        if (FINISHED.includes(next.status)) return;
      } catch (error) {
        if (stopped) return;
        const status = statusOf(error);
        if (status === 404 || status === 403) {
          setNotFound(true);
          return;
        }
        if (status === 401) return; // the API client sends the user to sign in
        failures += 1;
        if (failures >= OFFLINE_AFTER_FAILURES) setUnreachable(true);
      }
      if (Date.now() - started >= CLIENT_TIMEOUT_MS) {
        setTimedOut(true);
        return;
      }
      timer = setTimeout(tick, nextPollDelay(attempt++));
    };
    void tick();
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [jobId, round]);

  // Callers key the component by job id, so a new job starts with fresh state.
  const checkNow = useCallback(() => {
    setTimedOut(false);
    setRound((r) => r + 1);
  }, []);
  return { job, notFound, unreachable, timedOut, checkNow };
}
