'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HiSparkles as Sparkles,
  HiArrowPath as RotateCcw,
  HiPlay as Play,
  HiCheckCircle as CheckCircle2,
  HiXCircle as XCircle,
  HiClock as Clock,
  HiArrowTopRightOnSquare as ExternalLink,
  HiDocumentDuplicate as Copy,
  HiCheck as Check,
  HiArrowPath as RefreshCw,
  HiExclamationTriangle as AlertTriangle
} from "react-icons/hi2";
import { toast } from "sonner";
import { storyboardService } from "@/services/storyboardService";

export default function JobHistoryPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRetryingId, setIsRetryingId] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const data = await storyboardService.getJobs();
      setJobs(data);
    } catch (error) {
      console.error("Failed to load jobs list", error);
      toast.error("Failed to load jobs list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    // Poll active jobs list every 5 seconds to show progress updates
    const interval = setInterval(() => {
      const hasActiveJobs = jobs.some(j => j.status === 'pending' || j.status === 'processing');
      if (hasActiveJobs) {
        fetchJobs();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobs]);

  const handleCopyId = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      toast.success("Job ID copied!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetryJob = async (job: any) => {
    setIsRetryingId(job.id);
    toast.info("Retrying generation job...");
    
    try {
      // Fetch storyboard details to get parameters
      const storyboard = await storyboardService.getStoryboard(job.storyboard_id);
      
      // Request generation again enqueuing a new job
      const response = await storyboardService.generateAIStoryboard({
        idea: storyboard.idea,
        goal: storyboard.goal,
        tone: storyboard.tone,
        style: storyboard.style || "POV",
        audience: storyboard.audience || "General",
        duration: storyboard.duration || 15,
        platform: storyboard.platform || "Instagram Reels"
      });

      toast.success("New generation enqueued!");
      fetchJobs();
    } catch (error: any) {
      console.error("Failed to retry job", error);
      toast.error(error.response?.data?.detail || error.message || "Failed to retry storyboard generation.");
    } finally {
      setIsRetryingId(null);
    }
  };

  const calculateDuration = (job: any) => {
    if (!job.created_at) return "N/A";
    const start = new Date(job.started_at || job.created_at).getTime();
    const end = job.completed_at ? new Date(job.completed_at).getTime() : Date.now();
    const diffSeconds = Math.max(0, Math.round((end - start) / 1000));
    
    if (diffSeconds < 60) return `${diffSeconds}s`;
    const mins = Math.floor(diffSeconds / 60);
    const secs = diffSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 select-none">
      
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" /> AI Job History
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track background worker jobs, queues, and generations</p>
        </div>

        <Button 
          variant="outline" 
          onClick={() => { setLoading(true); fetchJobs(); }}
          className="rounded-full gap-2 font-bold text-xs py-5 px-5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh List
        </Button>
      </div>

      {/* Main Jobs Table / List container */}
      <div className="glass-panel border border-border rounded-3xl bg-card overflow-hidden">
        {loading ? (
          <div className="p-16 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-xs text-muted-foreground font-semibold">Loading background jobs queue...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-secondary flex items-center justify-center rounded-2xl">
              <Clock className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">No generation jobs</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
                When you generate a storyboard canvas, background execution jobs will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto select-text">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/30 text-[10px] font-bold text-muted-foreground uppercase tracking-wider select-none">
                  <th className="py-4 px-6">Job ID</th>
                  <th className="py-4 px-6">Storyboard Title</th>
                  <th className="py-4 px-6">Created At</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Progress</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jobs.map((job) => {
                  const isActive = job.status === "pending" || job.status === "processing";
                  
                  return (
                    <tr key={job.id} className="hover:bg-secondary/15 transition-colors text-xs font-semibold text-foreground">
                      {/* Job ID */}
                      <td className="py-4.5 px-6 font-mono text-[11px] text-muted-foreground">
                        <button 
                          onClick={(e) => handleCopyId(job.id, e)}
                          className="flex items-center gap-1.5 hover:text-foreground cursor-pointer"
                        >
                          <span>{job.id.substring(0, 8)}...</span>
                          {copiedId === job.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </td>

                      {/* Storyboard Title */}
                      <td className="py-4.5 px-6 font-bold max-w-[200px] truncate">
                        {job.status === "completed" ? (
                          <button 
                            onClick={() => router.push(`/dashboard/storyboards/${job.storyboard_id}`)}
                            className="flex items-center gap-1 hover:text-primary transition-colors text-left"
                          >
                            <span>{job.storyboard_title}</span>
                            <ExternalLink className="h-3 w-3 shrink-0 opacity-40" />
                          </button>
                        ) : (
                          <span>{job.storyboard_title}</span>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="py-4.5 px-6 text-muted-foreground font-medium select-none">
                        {formatTimestamp(job.created_at)}
                      </td>

                      {/* Status */}
                      <td className="py-4.5 px-6 select-none">
                        <Badge 
                          variant="outline" 
                          className={`font-bold text-[9px] rounded-md px-2 py-0.5 ${
                            job.status === "completed" ? "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5" :
                            job.status === "failed" ? "border-destructive/20 text-destructive bg-destructive/5" :
                            job.status === "processing" ? "border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5 animate-pulse" :
                            "border-border text-muted-foreground"
                          }`}
                        >
                          {job.status.toUpperCase()}
                        </Badge>
                      </td>

                      {/* Progress */}
                      <td className="py-4.5 px-6 max-w-[140px]">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground select-none">
                            <span>Progress</span>
                            <span>{job.progress}%</span>
                          </div>
                          <div className="w-28 bg-secondary h-1.5 rounded-full overflow-hidden border border-border/50">
                            <div 
                              className={`h-full rounded-full ${job.status === 'failed' ? 'bg-destructive' : 'bg-primary'}`}
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-4.5 px-6 font-mono text-muted-foreground font-medium select-none">
                        {calculateDuration(job)}
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-6 text-right select-none">
                        <div className="flex items-center justify-end gap-2">
                          {job.status === "failed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isRetryingId === job.id}
                              onClick={() => handleRetryJob(job)}
                              className="h-8 rounded-full text-[10px] font-bold border-destructive/20 text-destructive hover:bg-destructive/10 px-3.5"
                            >
                              <RotateCcw className="h-3 w-3 mr-1.5" />
                              Retry
                            </Button>
                          )}
                          {job.status === "completed" && (
                            <Button
                              size="sm"
                              onClick={() => router.push(`/dashboard/storyboards/${job.storyboard_id}`)}
                              className="h-8 rounded-full text-[10px] font-bold px-3.5"
                            >
                              Open
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Fail Diagnostics logs info panel */}
      {jobs.some(j => j.status === "failed" && j.error_message) && (
        <div className="bg-destructive/5 border border-destructive/10 rounded-3xl p-6 text-left space-y-3">
          <h4 className="text-sm font-bold text-destructive flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" /> Failed Job Diagnostics
          </h4>
          <div className="grid gap-3">
            {jobs.filter(j => j.status === "failed" && j.error_message).slice(0, 3).map((job) => (
              <div key={job.id} className="bg-background/80 p-4 border border-border/80 rounded-2xl text-xs space-y-1 select-text">
                <div className="flex items-center justify-between text-muted-foreground font-bold">
                  <span>Job ID: {job.id.substring(0, 8)}... ({job.storyboard_title})</span>
                  <span>{formatTimestamp(job.created_at)}</span>
                </div>
                <p className="text-destructive font-semibold mt-1 bg-destructive/5 border border-destructive/10 p-2.5 rounded-xl whitespace-pre-wrap leading-normal font-mono">
                  {job.error_message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
