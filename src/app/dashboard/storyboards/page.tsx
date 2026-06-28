'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Filter, FileText, Trash2, Edit2, ExternalLink, MoreVertical } from "lucide-react"
import { storyboardService } from "@/services/storyboardService"
import { Storyboard } from "@/types"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
}

export default function StoryboardsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTab, setFilterTab] = useState<"all" | "draft" | "generated">("all")
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
    if (confirm("Are you sure you want to delete this storyboard?")) {
      try {
        await storyboardService.deleteStoryboard(id)
        setStoryboards(storyboards.filter(s => s.id !== id))
      } catch (error) {
        console.error("Failed to delete storyboard", error)
      }
    }
  }

  // Filtering logic
  const filtered = storyboards.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const toneMatch = item.tone?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesSearch = titleMatch || toneMatch;
    
    if (filterTab === "all") return matchesSearch
    if (filterTab === "draft") return matchesSearch && item.status === "draft"
    if (filterTab === "generated") return matchesSearch && item.status === "generated"
    return matchesSearch
  })

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12 font-sans select-none max-w-7xl mx-auto"
    >
      
      {/* Header section */}
      <motion.div variants={itemVariant} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Your Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and edit your generated storyboard structures</p>
        </div>

        <Button
          size="lg"
          onClick={() => router.push("/dashboard/create")}
          className="rounded-full shadow-md font-semibold px-6 gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Canvas
        </Button>
      </motion.div>

      {/* Control bar */}
      <motion.div variants={itemVariant} className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 glass-panel p-4 rounded-3xl border border-border shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search storyboards, topics or keywords..."
            className="pl-11 pr-4 py-6 rounded-full bg-secondary/50 border-border focus:bg-background h-11 text-sm shadow-sm transition-all duration-300"
          />
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-2 overflow-x-auto p-1 bg-secondary/50 backdrop-blur-md rounded-full border border-border">
          <FilterTabButton
            active={filterTab === "all"}
            label="All Projects"
            onClick={() => setFilterTab("all")}
          />
          <FilterTabButton
            active={filterTab === "draft"}
            label="Drafts"
            onClick={() => setFilterTab("draft")}
          />
          <FilterTabButton
            active={filterTab === "generated"}
            label="Generated"
            onClick={() => setFilterTab("generated")}
          />
        </div>
      </motion.div>

      {/* Storyboard List */}
      <motion.div variants={itemVariant}>
        {loading ? (
          <div className="glass-panel rounded-3xl p-16 text-center flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <h3 className="text-sm font-medium text-muted-foreground">Loading your library...</h3>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-panel rounded-3xl border-dashed border-border p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">No storyboards found</h3>
            <p className="text-sm text-muted-foreground max-w-sm text-center">Try resetting the filter tabs or refining your search keywords.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -4 }}
                  className="group glass-panel rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-72 border border-border"
                  onClick={() => router.push(`/dashboard/create`)}
                >
                  {/* Canvas Cover Preview */}
                  <div className="h-40 bg-secondary/50 p-4 flex flex-col justify-end relative overflow-hidden">
                    {item.thumbnail_url && (
                      <div className="absolute inset-0 z-0">
                        <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-[10px] font-bold text-foreground z-10">
                      9:16
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-200 flex gap-2 z-10">
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8 rounded-md opacity-80 hover:opacity-100"
                        onClick={(e) => handleDelete(item.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="w-full relative z-10">
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block mb-1 drop-shadow-md">Script Preview</span>
                      <p className="text-white font-medium text-xs leading-snug line-clamp-2 drop-shadow-md">
                        “{item.idea}”
                      </p>
                    </div>
                  </div>

                  {/* Info section */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-card">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        {item.platform} · {item.duration}s Duration
                      </p>
                    </div>

                    {/* Footer details */}
                    <div className="flex justify-between items-center pt-3 border-t border-border mt-3">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="font-semibold text-[10px] rounded-md px-2 py-0.5">
                          {item.tone}
                        </Badge>
                        <Badge variant="outline" className="font-semibold text-[10px] rounded-md px-2 py-0.5 border-primary/20 text-primary">
                          {item.status}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Custom filter buttons
function FilterTabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-300 cursor-pointer ${
        active
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {active && (
        <motion.div
          layoutId="filter-active"
          className="absolute inset-0 bg-primary rounded-full shadow-md"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  )
}
