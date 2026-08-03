'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  HiArrowLeft as ArrowLeft,
  HiDocumentDuplicate as Copy,
  HiCheck as Check,
  HiArrowDownTray as Download,
  HiSparkles as Sparkles,
  HiFilm as Film,
  HiMusicalNote as Music,
  HiArrowTrendingUp as TrendingUp,
  HiShare as Share2,
  HiChevronDown as ChevronDown,
  HiChevronUp as ChevronUp,
  HiBookOpen as BookOpen,
  HiSquare3Stack3D as Layers,
  HiDevicePhoneMobile as Smartphone,
  HiDocumentText as FileText,
  HiClock as Clock,
  HiHandThumbUp as ThumbsUp,
  HiHandThumbDown as ThumbsDown,
  HiInformationCircle as Info
} from "react-icons/hi2";
import { FaLinkedinIn as Linkedin, FaTwitter as Twitter, FaInstagram as Instagram } from "react-icons/fa6";
import { toast } from "sonner";
import { storyboardService } from "@/services/storyboardService";

// Helper to copy text to clipboard
const useCopyToClipboard = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return { copiedId, copy };
};

export default function StoryboardDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { copiedId, copy } = useCopyToClipboard();

  const [storyboard, setStoryboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openScenes, setOpenScenes] = useState<Record<string, boolean>>({});
  const [activeRepurpose, setActiveRepurpose] = useState<string | null>("linkedin");

  useEffect(() => {
    const fetchStoryboard = async () => {
      try {
        const data = await storyboardService.getStoryboard(id);
        setStoryboard(data);
        
        // Initialize first scene as expanded
        if (data?.scenes && data.scenes.length > 0) {
          setOpenScenes({ [data.scenes[0].id]: true });
        }
      } catch (error) {
        console.error("Failed to fetch storyboard details", error);
        toast.error("Failed to load storyboard details");
      } finally {
        setLoading(false);
      }
    };
    fetchStoryboard();
  }, [id]);

  const toggleScene = (sceneId: string) => {
    setOpenScenes(prev => ({ ...prev, [sceneId]: !prev[sceneId] }));
  };

  const handleDownloadScript = () => {
    if (!storyboard) return;
    
    let text = `STORYBOARD SCRIPT: ${storyboard.title || "Untitled"}\n`;
    text += `Idea: ${storyboard.idea}\n`;
    text += `Goal: ${storyboard.goal} | Platform: ${storyboard.platform} | Tone: ${storyboard.tone}\n\n`;
    text += `--- HOOK ---\n${storyboard.hook || "None"}\n\n`;
    
    if (storyboard.scenes && storyboard.scenes.length > 0) {
      text += `--- SCENES TIMELINE ---\n`;
      storyboard.scenes.forEach((s: any) => {
        text += `Scene ${s.scene_number}: ${s.title || "Scene"}\n`;
        text += `Duration: ${s.duration}s | Camera: ${s.camera_angle || "Medium Shot"} | Vibe: ${s.music_mood || "N/A"}\n`;
        text += `Visual Direction: ${s.scene_prompt || "N/A"}\n`;
        text += `Script dialogue: "${s.script_segment || ""}"\n`;
        text += `--------------------------------------\n`;
      });
    }

    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${(storyboard.title || "storyboard").toLowerCase().replace(/\s+/g, "_")}_script.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Script downloaded!");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-muted-foreground">Loading workspace details...</p>
      </div>
    );
  }

  if (!storyboard) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 select-none">
        <h3 className="text-lg font-bold text-foreground">Storyboard not found</h3>
        <p className="text-sm text-muted-foreground">The project may have been deleted or moved.</p>
        <Button onClick={() => router.push("/dashboard/storyboards")} className="rounded-full">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* ── Toolbar Header ── */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border pb-6 select-none">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push("/dashboard/storyboards")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{storyboard.platform}</span>
              <Badge variant="secondary" className="font-semibold text-[10px] rounded-md px-1.5 py-0.5 border border-primary/10">
                {storyboard.tone}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              {storyboard.title || "Untitled Project"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleDownloadScript}
            className="rounded-full font-bold text-xs py-5 px-5 gap-2"
          >
            <Download className="h-4 w-4" />
            Download TXT
          </Button>
          <Button 
            onClick={() => copy(storyboard.script || "", "full-script")}
            className="rounded-full font-bold text-xs py-5 px-5 gap-2 shadow-sm"
          >
            {copiedId === "full-script" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            Copy Full Script
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── LEFT PANEL (60% width) ── */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Bento Metadata Card */}
          <section className="glass-panel rounded-3xl border border-border p-6 relative overflow-hidden bg-card">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-4 border-b border-border/60">
              <Layers className="h-4 w-4 text-primary" /> Idea & Brief Overview
            </h3>
            <div className="pt-4 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Generated Concept Vibe</span>
                <p className="text-foreground text-sm font-semibold mt-1 leading-relaxed">
                  “{storyboard.idea}”
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50 text-left">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Goal</span>
                  <p className="text-foreground text-xs font-bold capitalize mt-0.5">{storyboard.goal || 'Inspect'}</p>
                </div>
                <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50 text-left">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Pacing style</span>
                  <p className="text-foreground text-xs font-bold capitalize mt-0.5">{storyboard.style || 'POV style'}</p>
                </div>
                <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50 text-left">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Audience</span>
                  <p className="text-foreground text-xs font-bold mt-0.5 truncate">{storyboard.audience || 'General'}</p>
                </div>
                <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50 text-left">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Length</span>
                  <p className="text-foreground text-xs font-bold mt-0.5">{storyboard.duration} seconds</p>
                </div>
              </div>
            </div>
          </section>

          {/* Hook & Regenerated Hooks */}
          <section className="glass-panel rounded-3xl border border-border p-6 bg-card">
            <div className="flex justify-between items-center pb-4 border-b border-border/60">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" /> Primary Hook Layout
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copy(storyboard.hook || "", "primary-hook")}
                className="h-8 w-8 rounded-lg"
              >
                {copiedId === "primary-hook" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
            
            <div className="pt-4 space-y-6">
              <div className="p-4 bg-secondary/80 border border-primary/20 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 bg-primary h-full"></div>
                <p className="text-foreground font-bold text-sm leading-relaxed">
                  “{storyboard.hook || "Analyzing script flow..."}”
                </p>
              </div>

              {/* Alternative Hooks Carousel */}
              {storyboard.hooks && storyboard.hooks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Alternative Hook Variants</h4>
                  <div className="grid gap-3 max-h-48 overflow-y-auto pr-1">
                    {storyboard.hooks.map((h: any, idx: number) => (
                      <div key={h.id} className="flex justify-between items-center p-3 bg-secondary/30 hover:bg-secondary/60 border border-border/50 rounded-xl transition-all">
                        <p className="text-xs font-semibold text-foreground leading-relaxed pr-4 select-text">
                          {idx + 1}. {h.hook}
                        </p>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => copy(h.hook, `alt-${h.id}`)}
                          className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          {copiedId === `alt-${h.id}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Scenes Timeline */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2 select-none">
              <Film className="h-4.5 w-4.5 text-primary" /> Storyboard Timeline Scenes ({storyboard.scenes?.length || 0})
            </h3>

            {(!storyboard.scenes || storyboard.scenes.length === 0) ? (
              <div className="glass-panel p-8 rounded-3xl text-center text-muted-foreground text-sm font-medium bg-card">
                No scenes configured for this storyboard.
              </div>
            ) : (
              <div className="space-y-4 relative pl-3 sm:pl-4 border-l border-border/60 ml-4 py-2">
                {storyboard.scenes.map((s: any, idx: number) => {
                  const isOpen = !!openScenes[s.id];
                  
                  return (
                    <motion.div 
                      key={s.id}
                      layout="position"
                      className={`glass-panel border rounded-3xl overflow-hidden transition-all duration-300 relative bg-card ${
                        isOpen ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20'
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-[-26px] top-6 w-3 h-3 rounded-full border-2 bg-background z-10 transition-colors ${
                        isOpen ? 'border-primary' : 'border-muted-foreground/30'
                      }`}></div>

                      {/* Accordion Trigger */}
                      <div 
                        onClick={() => toggleScene(s.id)}
                        className="p-5 flex justify-between items-center cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary text-foreground text-xs font-bold">
                            {s.scene_number}
                          </span>
                          <div className="text-left">
                            <h4 className="text-sm font-bold text-foreground line-clamp-1">{s.title || `Scene ${s.scene_number}`}</h4>
                            <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{s.camera_angle || "Medium Shot"} · {s.duration || "4s"}s</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {s.lighting && <Badge variant="outline" className="hidden sm:inline-flex text-[9px] py-0 px-2 font-medium bg-secondary">{s.lighting}</Badge>}
                          {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>

                      {/* Expanded View */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-border/60 bg-secondary/15"
                          >
                            <div className="p-6 space-y-6 text-left select-text">
                              
                              <div className="grid sm:grid-cols-2 gap-6">
                                {/* Visual prompts */}
                                <div className="space-y-2">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Visual Camera & Subject Prompt</span>
                                  <p className="text-xs text-foreground bg-card p-3 rounded-xl border border-border/50 font-medium leading-relaxed">
                                    {s.scene_prompt || "Camera captures detailed background movement."}
                                  </p>
                                  {s.negative_prompt && (
                                    <p className="text-[10px] text-destructive font-medium leading-relaxed pl-1">
                                      Negative: {s.negative_prompt}
                                    </p>
                                  )}
                                </div>

                                {/* Shot settings block */}
                                <div className="bg-card/60 p-4 rounded-2xl border border-border/50 space-y-3">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Shot Details</span>
                                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground">
                                    <div className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-primary shrink-0" /> Camera Angle: {s.camera_angle || "Eye Level"}</div>
                                    <div className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-primary shrink-0" /> Movement: {s.camera_movement || "Fixed"}</div>
                                    <div className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-primary shrink-0" /> Lighting: {s.lighting || "Natural"}</div>
                                    <div className="flex items-center gap-1.5"><Info className="h-3.5 w-3.5 text-primary shrink-0" /> Transition: {s.transition || "Cut"}</div>
                                  </div>
                                </div>
                              </div>

                              {/* B-Roll script section */}
                              {s.broll && (
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">B-Roll Visual Action</span>
                                  <p className="text-xs text-foreground font-medium leading-relaxed">
                                    {s.broll}
                                  </p>
                                </div>
                              )}

                              {/* Dos & Donts */}
                              {((s.dos && s.dos.length > 0) || (s.donts && s.donts.length > 0)) && (
                                <div className="grid sm:grid-cols-2 gap-4 pt-1">
                                  {s.dos && s.dos.length > 0 && (
                                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-2xl space-y-1.5 text-emerald-800 dark:text-emerald-400">
                                      <span className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"><ThumbsUp className="h-3.5 w-3.5" /> Do</span>
                                      <ul className="list-disc pl-4 text-xs font-semibold space-y-1">
                                        {s.dos.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                      </ul>
                                    </div>
                                  )}
                                  {s.donts && s.donts.length > 0 && (
                                    <div className="bg-destructive/5 border border-destructive/10 p-3.5 rounded-2xl space-y-1.5 text-destructive">
                                      <span className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5"><ThumbsDown className="h-3.5 w-3.5" /> Don't</span>
                                      <ul className="list-disc pl-4 text-xs font-semibold space-y-1">
                                        {s.donts.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Dialogue bubble */}
                              <div className="bg-card p-4 rounded-2xl border border-border/80 relative overflow-hidden flex flex-col gap-2">
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary/40"></div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Dialogue / Captions (Voiceover)</span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => copy(s.script_segment || "", `dialogue-${s.id}`)}
                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                  >
                                    {copiedId === `dialogue-${s.id}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                                  </Button>
                                </div>
                                <p className="text-foreground font-bold text-sm leading-relaxed italic">
                                  {s.script_segment ? `“${s.script_segment}”` : "Voiceover remains silent (B-roll background ambiance)."}
                                </p>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

        </div>

        {/* ── RIGHT PANEL (40% width) ── */}
        <div className="lg:col-span-5 space-y-8 select-none">
          
          {/* Captions & Hashtags */}
          <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-6">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-4 border-b border-border/60">
                <BookOpen className="h-4.5 w-4.5 text-primary" /> Generated Video Captions
              </h3>
              
              <div className="pt-4 space-y-3">
                {storyboard.captions && storyboard.captions.length > 0 ? (
                  storyboard.captions.map((c: any) => (
                    <div key={c.id} className="group relative bg-secondary/40 p-4 border border-border/50 rounded-2xl hover:border-primary/20 transition-all flex flex-col justify-between items-start gap-2">
                      <p className="text-xs font-semibold text-foreground leading-relaxed pr-6 select-text text-left">
                        {c.caption}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => copy(c.caption, c.id)}
                        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                      >
                        {copiedId === c.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic text-left">No caption presets saved.</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center pb-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Optimized Social Hashtags</h4>
                {storyboard.hashtags && storyboard.hashtags.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copy(storyboard.hashtags.map((h: any) => h.hashtag).join(" "), "tags-all")}
                    className="h-7 text-xs font-bold text-primary hover:text-primary/80 px-2"
                  >
                    {copiedId === "tags-all" ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    Copy All
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {storyboard.hashtags && storyboard.hashtags.length > 0 ? (
                  storyboard.hashtags.map((h: any) => (
                    <Badge 
                      key={h.id} 
                      onClick={() => copy(h.hashtag, h.id)}
                      className="cursor-pointer bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/20 text-xs font-bold rounded-lg px-2.5 py-1"
                    >
                      {h.hashtag}
                      {copiedId === h.id && <Check className="h-3 w-3 ml-1 text-emerald-500" />}
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic text-left">No hashtag presets saved.</p>
                )}
              </div>
            </div>
          </section>

          {/* Music Suggestions */}
          {storyboard.music && storyboard.music.length > 0 && (
            <section className="glass-panel rounded-3xl border border-border p-6 bg-card">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-4 border-b border-border/60">
                <Music className="h-4.5 w-4.5 text-primary" /> Audio & Music Direction
              </h3>
              
              <div className="pt-4 grid grid-cols-2 gap-4">
                {storyboard.music.map((m: any) => (
                  <div key={m.id} className="bg-secondary/40 border border-border/50 rounded-2xl p-4 text-left flex flex-col justify-between h-24">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Genre</span>
                    <p className="text-foreground font-bold text-sm truncate">{m.genre}</p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none w-fit font-bold text-[9px] mt-1.5 px-2">
                      Mood: {m.mood}
                    </Badge>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trends Analytics */}
          {storyboard.trends && storyboard.trends.length > 0 && (
            <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-4 border-b border-border/60">
                <TrendingUp className="h-4.5 w-4.5 text-primary" /> Trend Analysis Insights
              </h3>
              
              {storyboard.trends.map((t: any) => (
                <div key={t.id} className="space-y-4 pt-1 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/40 border border-border/50 rounded-2xl p-3">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Recommended Posting Time</span>
                      <p className="text-foreground font-bold text-xs mt-1">{t.posting_time || "N/A"}</p>
                    </div>
                    <div className="bg-secondary/40 border border-border/50 rounded-2xl p-3">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Recommended Editing Vibe</span>
                      <p className="text-foreground font-bold text-xs mt-1">{t.editing_style || "N/A"}</p>
                    </div>
                  </div>

                  {t.content_gap && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Identified Content Gap</span>
                      <p className="text-xs text-foreground font-medium leading-relaxed select-text">
                        {t.content_gap}
                      </p>
                    </div>
                  )}

                  {t.transitions && t.transitions.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Trend Transition Recommendations</span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.transitions.map((item: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-[10px] bg-card border-border font-medium px-2 py-0.5">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {t.sounds && t.sounds.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Trending Audio Sounds</span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.sounds.map((item: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-[10px] border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/5 font-semibold px-2 py-0.5">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Repurpose Content (Accordion) */}
          {storyboard.repurpose && (
            <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 pb-4 border-b border-border/60">
                <Share2 className="h-4.5 w-4.5 text-primary" /> Multi-Platform Content Repurposing
              </h3>

              {/* Accordion Navigation tabs */}
              <div className="flex border-b border-border">
                {['linkedin', 'twitter', 'carousel', 'blog', 'newsletter'].map((tab) => {
                  const content = storyboard.repurpose[tab];
                  if (!content) return null;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveRepurpose(tab)}
                      className={`flex-1 text-center py-2 text-xs font-bold border-b-2 capitalize transition-colors duration-200 ${
                        activeRepurpose === tab
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Active Tab View */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {activeRepurpose && storyboard.repurpose[activeRepurpose] && (
                    <motion.div
                      key={activeRepurpose}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="bg-secondary/40 border border-border/50 p-4 rounded-2xl text-left select-text relative">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                            {activeRepurpose === 'linkedin' && <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />}
                            {activeRepurpose === 'twitter' && <Twitter className="h-3.5 w-3.5 text-foreground" />}
                            {activeRepurpose === 'carousel' && <Instagram className="h-3.5 w-3.5 text-[#E1306C]" />}
                            {activeRepurpose === 'blog' && <FileText className="h-3.5 w-3.5 text-muted-foreground" />}
                            {activeRepurpose === 'newsletter' && <FileText className="h-3.5 w-3.5 text-muted-foreground" />}
                            {activeRepurpose} Post Copy
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => copy(storyboard.repurpose[activeRepurpose], `repurpose-${activeRepurpose}`)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            {copiedId === `repurpose-${activeRepurpose}` ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs font-semibold text-foreground leading-relaxed whitespace-pre-wrap">
                          {storyboard.repurpose[activeRepurpose]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          )}

        </div>

      </div>

    </div>
  );
}
