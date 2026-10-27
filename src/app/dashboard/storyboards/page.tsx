'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  HiMagnifyingGlass as Search, 
  HiPlus as Plus, 
  HiClock as Clock, 
  HiFilm as FilmIcon, 
  HiTrash as Trash2 
} from "react-icons/hi2"
import { toast } from "sonner"
import { storyboardService } from "@/services/storyboardService"
import { Storyboard } from "@/types"

export default function StoryboardsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPlatform, setFilterPlatform] = useState<string>("all")
  const [storyboards, setStoryboards] = useState<Storyboard[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStoryboards = async () => {
    setLoading(true)
    try {
      const data = await storyboardService.getStoryboards()
      setStoryboards(data)
    } catch (error) {
      console.error("Failed to fetch storyboards", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStoryboards()
  }, [])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (confirm("Are you sure you want to delete this shoot plan?")) {
      try {
        await storyboardService.deleteStoryboard(id)
        setStoryboards(storyboards.filter((s) => s.id !== id))
        toast.success("Shoot plan deleted")
      } catch (error) {
        console.error("Failed to delete storyboard", error)
        toast.error("Failed to delete storyboard")
      }
    }
  }

  const filtered = storyboards.filter((item) => {
    const titleMatch = (item.title || item.idea || "").toLowerCase().includes(searchQuery.toLowerCase())
    const platformMatch = filterPlatform === "all" || (item.platform || "").toLowerCase() === filterPlatform.toLowerCase()
    return titleMatch && platformMatch
  })

  return (
    <div className="space-y-8 pb-16 select-none">
      
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            My Storyboards
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
            Your collection of ready-to-shoot scripts and camera-directed scenes.
          </p>
        </div>

        <Button
          onClick={() => router.push("/dashboard/create")}
          className="rounded-xl h-10 px-4 bg-primary text-primary-foreground font-bold text-xs gap-1.5 shadow-xs hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          <span>New Storyboard</span>
        </Button>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, hook, or keyword..."
            className="pl-10 h-10 rounded-xl bg-secondary/40 border-border text-xs focus:bg-background"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {["all", "reels", "tiktok", "shorts"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterPlatform === p
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
              }`}
            >
              {p === "all" ? "All Platforms" : p}
            </button>
          ))}
        </div>
      </div>

      {/* ── Projects Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-44 rounded-2xl border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-card space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-secondary text-primary mx-auto flex items-center justify-center">
            <FilmIcon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">No storyboards found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {searchQuery ? "No shoot plans match your query. Try clearing filters." : "Create your first storyboard to get camera directions and scripts."}
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/dashboard/create")}
            className="rounded-xl text-xs font-bold bg-primary text-primary-foreground gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Create Shoot Plan
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const scenesCount = item.scenes?.length || 4
            const formattedDate = item.created_at
              ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "Recently"

            return (
              <Link
                key={item.id}
                href={`/dashboard/storyboards/${item.id}`}
                className="group rounded-3xl border border-border bg-card p-5 space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-primary/30 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider bg-secondary text-secondary-foreground border-none">
                      {item.platform || "Reels"}
                    </Badge>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {item.duration || 30}s
                      </span>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        title="Delete storyboard"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {item.title || item.idea || "Untitled Shoot Plan"}
                  </h3>

                  {item.hook && (
                    <p className="text-xs text-muted-foreground italic line-clamp-2 leading-relaxed">
                      “{item.hook}”
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {scenesCount} scenes planned
                  </span>
                  <span>{formattedDate}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

    </div>
  )
}
