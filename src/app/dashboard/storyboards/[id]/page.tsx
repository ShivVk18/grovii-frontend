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
  HiInformationCircle as Info,
  HiLanguage as LanguageIcon,
  HiLightBulb as LightBulbIcon,
  HiVideoCamera as VideoCameraIcon,
  HiChatBubbleBottomCenterText as VoiceIcon,
  HiFaceSmile as SmileIcon,
  HiAdjustmentsHorizontal as Sliders
} from "react-icons/hi2";
import { FaLinkedinIn as Linkedin, FaTwitter as Twitter, FaInstagram as Instagram } from "react-icons/fa6";
import { toast } from "sonner";
import { storyboardService } from "@/services/storyboardService";

// Helper hook for smooth clipboard copy
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
  const [openAdvancedScenes, setOpenAdvancedScenes] = useState<Record<string, boolean>>({});
  const [showGlobalAdvanced, setShowGlobalAdvanced] = useState(false);
  const [activeRepurpose, setActiveRepurpose] = useState<string | null>("linkedin");

  useEffect(() => {
    const fetchStoryboard = async () => {
      try {
        const data = await storyboardService.getStoryboard(id);
        setStoryboard(data);
        
        // Initialize all scene cards open by default for creator clarity
        if (data?.scenes && data.scenes.length > 0) {
          const initialOpen: Record<string, boolean> = {};
          data.scenes.forEach((s: any) => {
            initialOpen[s.id] = true;
          });
          setOpenScenes(initialOpen);
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

  const toggleAdvancedScene = (sceneId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenAdvancedScenes(prev => ({ ...prev, [sceneId]: !prev[sceneId] }));
  };

  const handleDownloadScript = () => {
    if (!storyboard) return;
    
    let text = `GROVII CREATIVE SHOOT PLAN\n=========================\n`;
    text += `Project: ${storyboard.title || "Untitled Project"}\n`;
    text += `Idea: ${storyboard.idea}\n`;
    text += `Goal: ${storyboard.goal} | Platform: ${storyboard.platform} | Language: ${storyboard.language || 'English'}\n\n`;
    text += `--- HOOK ---\n"${storyboard.hook || "None"}"\n\n`;
    
    if (storyboard.scenes && storyboard.scenes.length > 0) {
      text += `--- SCENES TIMELINE ---\n\n`;
      storyboard.scenes.forEach((s: any, idx: number) => {
        text += `Scene ${idx + 1}: ${s.title || "Scene"}\n`;
        text += `⏱ Duration: ${s.duration || "3 sec"}\n`;
        text += `🎥 What to Record: ${s.what_to_record || s.broll || s.subject || "N/A"}\n`;
        text += `🗣 What to Say: "${s.what_to_say || s.script_segment || ""}"\n`;
        text += `💡 Tips: ${s.tips || (s.dos ? s.dos.join(', ') : "Shoot cleanly")}\n`;
        text += `🙂 Emotion: ${s.emotion || s.music_mood || "Energetic"}\n`;
        text += `--------------------------------------\n\n`;
      });
    }

    if (storyboard.script) {
      text += `--- FULL VOICE OVER SCRIPT ---\n${storyboard.script}\n`;
    }

    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${(storyboard.title || "grovii_shoot_plan").toLowerCase().replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Shoot plan downloaded!");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-muted-foreground">Preparing your creative shoot plan...</p>
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
    <div className="space-y-10 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* ── Top Header Navigation ── */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-border/80 pb-6 select-none">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push("/dashboard/storyboards")}
            className="rounded-full hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="font-bold text-[10px] rounded-md px-2 py-0.5 uppercase tracking-wider bg-secondary">
                {storyboard.platform}
              </Badge>
              <Badge variant="outline" className="font-bold text-[10px] rounded-md px-2 py-0.5 border-primary/20 text-primary">
                {storyboard.tone}
              </Badge>
              {storyboard.language && (
                <Badge variant="secondary" className="font-bold text-[10px] rounded-md px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-none">
                  🌐 {storyboard.language}
                </Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              {storyboard.title || "Creative Shoot Plan"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleDownloadScript}
            className="rounded-full font-bold text-xs py-5 px-5 gap-2 border-border hover:bg-secondary"
          >
            <Download className="h-4 w-4 text-primary" />
            Download Shoot Plan
          </Button>
          <Button 
            onClick={() => copy(storyboard.script || "", "full-script-header")}
            className="rounded-full font-bold text-xs py-5 px-5 gap-2 shadow-sm"
          >
            {copiedId === "full-script-header" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            Copy Voiceover
          </Button>
        </div>
      </div>

      {/* ── 1. PROJECT OVERVIEW ── */}
      <section className="glass-panel rounded-3xl border border-border p-6 bg-card relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" /> Project Brief Overview
          </span>
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-xs rounded-full px-3 py-0.5">
            Ready to Shoot
          </Badge>
        </div>

        <div className="pt-4 space-y-4">
          <div>
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">Your Video Idea</span>
            <p className="text-foreground text-base font-semibold mt-1 leading-relaxed">
              “{storyboard.idea}”
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 select-none">
            <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Goal</span>
              <p className="text-foreground text-xs font-bold capitalize mt-0.5 truncate">{storyboard.goal || 'Engage'}</p>
            </div>
            <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Platform</span>
              <p className="text-foreground text-xs font-bold capitalize mt-0.5 truncate">{storyboard.platform}</p>
            </div>
            <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Duration</span>
              <p className="text-foreground text-xs font-bold mt-0.5">{storyboard.duration} Seconds</p>
            </div>
            <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Language</span>
              <p className="text-foreground text-xs font-bold capitalize mt-0.5 truncate">{storyboard.language || 'English'}</p>
            </div>
            <div className="bg-secondary/40 p-3 rounded-2xl border border-border/50 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Target Audience</span>
              <p className="text-foreground text-xs font-bold mt-0.5 truncate">{storyboard.audience || 'General Creators'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. HOOK ── */}
      <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border/60">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" /> The Hook
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => copy(storyboard.hook || "", "primary-hook")}
            className="h-8 text-xs font-bold text-muted-foreground hover:text-foreground rounded-full"
          >
            {copiedId === "primary-hook" ? <Check className="h-4 w-4 text-emerald-500 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            Copy Hook
          </Button>
        </div>

        <div className="p-5 bg-gradient-to-r from-primary/10 via-secondary/50 to-secondary/20 border border-primary/20 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 bg-primary h-full"></div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Opening Line (First 3 Seconds)</span>
          <p className="text-foreground font-extrabold text-lg sm:text-xl leading-relaxed">
            “{storyboard.hook || "Analyzing opening hook..."}”
          </p>
        </div>

        {storyboard.hooks && storyboard.hooks.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Alternative Hook Angles</span>
            <div className="grid gap-2">
              {storyboard.hooks.map((h: any, idx: number) => (
                <div key={h.id || idx} className="flex justify-between items-center p-3 bg-secondary/30 hover:bg-secondary/60 border border-border/50 rounded-xl transition-all">
                  <p className="text-xs font-semibold text-foreground leading-relaxed pr-4">
                    {idx + 1}. “{h.hook}”
                  </p>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copy(h.hook, `alt-${h.id || idx}`)}
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    {copiedId === `alt-${h.id || idx}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── 3. STORYBOARD (THE MOST IMPORTANT SECTION) ── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 select-none border-b border-border/60 pb-3">
          <div>
            <h2 className="text-xl font-black text-foreground flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" /> Storyboard Shoot Plan
            </h2>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Follow scene by scene. Open Grovii on your phone and start recording.
            </p>
          </div>
          <Badge variant="outline" className="w-fit font-bold text-xs rounded-full px-3 py-1 bg-secondary/50">
            {storyboard.scenes?.length || 0} Scenes Planned
          </Badge>
        </div>

        {(!storyboard.scenes || storyboard.scenes.length === 0) ? (
          <div className="glass-panel p-8 rounded-3xl text-center text-muted-foreground text-sm font-medium bg-card">
            No scenes available for this storyboard.
          </div>
        ) : (
          <div className="space-y-6">
            {storyboard.scenes.map((s: any, idx: number) => {
              const isOpen = openScenes[s.id] !== false; // Default open
              const isAdvancedOpen = !!openAdvancedScenes[s.id];
              const adv = s.advanced || {};

              const whatToShow = s.what_to_show || s.what_to_record || s.broll || s.subject || "Show clear visual action for this scene.";
              const voiceoverExample = s.voiceover_example || s.what_to_say || s.script_segment || "";
              const onScreenText = s.onscreen_text || "";
              const tipsText = s.tips || (s.dos && Array.isArray(s.dos) ? s.dos.join(". ") : "Keep camera steady near soft natural light.");
              const emotionText = s.emotion || s.music_mood || "Energetic";

              return (
                <motion.div 
                  key={s.id || idx}
                  layout="position"
                  className={`glass-panel border rounded-3xl overflow-hidden transition-all duration-300 bg-card ${
                    isOpen ? 'border-primary/30 shadow-sm' : 'border-border hover:border-primary/20'
                  }`}
                >
                  {/* Card Header Banner */}
                  <div 
                    onClick={() => toggleScene(s.id)}
                    className="p-5 flex justify-between items-center cursor-pointer select-none bg-gradient-to-r from-secondary/40 via-card to-card hover:bg-secondary/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-2xl bg-primary text-primary-foreground text-sm font-black shadow-sm shrink-0">
                        {s.scene_number || idx + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-extrabold text-foreground line-clamp-1">
                          {s.title || `Scene ${s.scene_number || idx + 1}`}
                        </h3>
                        <p className="text-xs text-muted-foreground font-semibold mt-0.5 flex items-center gap-2">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" /> {s.duration || "3 sec"}</span>
                          <span>•</span>
                          <span className="text-primary font-bold">{emotionText}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="hidden sm:inline-flex text-[10px] font-bold py-1 px-3 rounded-full bg-secondary">
                        ⏱ {s.duration || "3 sec"}
                      </Badge>
                      {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Expandable Scene Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border/60 p-6 space-y-6 text-left"
                      >
                        {/* 🎥 What to Show */}
                        <div className="space-y-2 bg-secondary/30 p-4 rounded-2xl border border-border/50">
                          <span className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-2">
                            <VideoCameraIcon className="h-4.5 w-4.5 text-primary" /> 🎥 What to Show
                          </span>
                          <p className="text-sm text-foreground font-medium leading-relaxed select-text">
                            {whatToShow}
                          </p>
                        </div>

                        {/* 🗣 Voiceover Example */}
                        <div className="space-y-2 bg-gradient-to-r from-primary/5 via-card to-secondary/30 p-4.5 rounded-2xl border border-primary/20 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-2">
                              <VoiceIcon className="h-4.5 w-4.5 text-primary" /> 🗣 Voiceover Example
                            </span>
                            {voiceoverExample && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => { e.stopPropagation(); copy(voiceoverExample, `say-${s.id}`); }}
                                className="h-7 text-xs font-bold text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full px-2.5 transition-colors"
                              >
                                {copiedId === `say-${s.id}` ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                                Copy Voiceover
                              </Button>
                            )}
                          </div>
                          <p className="text-base font-bold text-foreground leading-relaxed italic select-text">
                            {voiceoverExample ? `“${voiceoverExample}”` : "(No voiceover needed for this scene — focus on visual action)"}
                          </p>
                          <p className="text-[11px] text-muted-foreground font-medium italic mt-1">
                            💡 Use this as a starting point. Feel free to adapt in your own natural tone.
                          </p>
                        </div>

                        {/* On-Screen Text & Tips & Emotion Grid */}
                        <div className="grid sm:grid-cols-3 gap-4">
                          {onScreenText && (
                            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl space-y-1">
                              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                                💬 On-Screen Text Overlay
                              </span>
                              <p className="text-xs font-black text-foreground select-text mt-1">
                                {onScreenText}
                              </p>
                            </div>
                          )}

                          <div className={`${onScreenText ? 'sm:col-span-1' : 'sm:col-span-2'} bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl space-y-1`}>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                              <LightBulbIcon className="h-4 w-4" /> 💡 Shooting Tip
                            </span>
                            <p className="text-xs font-semibold text-foreground leading-relaxed select-text mt-0.5">
                              {tipsText}
                            </p>
                          </div>

                          <div className="bg-secondary/40 border border-border/50 p-4 rounded-2xl flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                              <SmileIcon className="h-3.5 w-3.5 text-primary" /> 🙂 Scene Emotion
                            </span>
                            <p className="text-sm font-bold text-foreground capitalize mt-1">
                              {emotionText}
                            </p>
                          </div>
                        </div>

                        {/* ── Advanced Toggle Section (Collapsible) ── */}
                        <div className="pt-2 border-t border-border/40">
                          <button
                            onClick={(e) => toggleAdvancedScene(s.id, e)}
                            className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors py-1 select-none"
                          >
                            <Sliders className="h-3.5 w-3.5 text-primary" />
                            {isAdvancedOpen ? "▲ Hide Technical Settings" : "▼ Show Advanced (Camera, Lighting & Prompts)"}
                          </button>

                          <AnimatePresence>
                            {isAdvancedOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-3 p-4 bg-secondary/40 rounded-2xl border border-border/60 space-y-4 text-xs font-medium"
                              >
                                <div className="grid sm:grid-cols-3 gap-3">
                                  <div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Best Camera Position</span>
                                    <p className="text-foreground font-semibold mt-0.5">
                                      {adv.camera_angle || s.camera_angle || "Eye Level"} ({adv.camera_movement || s.camera_movement || "Static"})
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Lighting Tip</span>
                                    <p className="text-foreground font-semibold mt-0.5">
                                      {adv.lighting || s.lighting || "Natural Light"}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Next Scene Tip</span>
                                    <p className="text-foreground font-semibold mt-0.5">
                                      {adv.transition || s.transition || "Quick Cut"}
                                    </p>
                                  </div>
                                </div>

                                {(adv.scene_prompt || s.scene_prompt) && (
                                  <div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">AI Image Prompt (Advanced)</span>
                                    <p className="text-foreground font-mono text-[11px] bg-card p-3 rounded-xl border border-border/60 mt-1 select-text">
                                      {adv.scene_prompt || s.scene_prompt}
                                    </p>
                                  </div>
                                )}

                                {(adv.negative_prompt || s.negative_prompt) && (
                                  <div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Negative Prompt</span>
                                    <p className="text-destructive/90 font-mono text-[10px] mt-0.5 select-text">
                                      {adv.negative_prompt || s.negative_prompt}
                                    </p>
                                  </div>
                                )}

                                {adv.technical_settings && (
                                  <div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Technical Settings</span>
                                    <p className="text-foreground font-semibold mt-0.5">{adv.technical_settings}</p>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
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

      {/* ── 4. SCRIPT ── */}
      <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border/60">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Full Spoken Script
          </h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadScript}
              className="h-8 text-xs font-bold rounded-full gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-primary" /> Download
            </Button>
            <Button 
              size="sm" 
              onClick={() => copy(storyboard.script || "", "full-script-card")}
              className="h-8 text-xs font-bold rounded-full gap-1.5"
            >
              {copiedId === "full-script-card" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              Copy All
            </Button>
          </div>
        </div>

        <div className="bg-secondary/30 p-5 rounded-2xl border border-border/50 relative">
          <p className="text-foreground font-medium text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text">
            {storyboard.script || "Script being prepared..."}
          </p>
        </div>
      </section>

      {/* ── 5. CAPTIONS ── */}
      {storyboard.captions && storyboard.captions.length > 0 && (
        <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
            <BookOpen className="h-5 w-5 text-primary" /> Post Captions
          </h3>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {storyboard.captions.map((c: any, idx: number) => (
              <div key={c.id || idx} className="bg-secondary/40 border border-border/50 p-4 rounded-2xl flex flex-col justify-between gap-3 text-left relative group">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Option {idx + 1}</span>
                <p className="text-xs font-semibold text-foreground leading-relaxed select-text">
                  {c.caption}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copy(c.caption, `cap-${c.id || idx}`)}
                  className="w-full h-8 text-xs font-bold text-primary hover:text-primary/80 bg-background/50 hover:bg-background rounded-xl gap-1"
                >
                  {copiedId === `cap-${c.id || idx}` ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  Copy Caption
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. HASHTAGS ── */}
      {storyboard.hashtags && storyboard.hashtags.length > 0 && (
        <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border/60">
            <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
              # Hashtags
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copy(storyboard.hashtags.map((h: any) => h.hashtag).join(" "), "tags-all")}
              className="h-8 text-xs font-bold text-primary hover:text-primary/80 rounded-full"
            >
              {copiedId === "tags-all" ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
              Copy All Hashtags
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {storyboard.hashtags.map((h: any, idx: number) => (
              <Badge 
                key={h.id || idx} 
                onClick={() => copy(h.hashtag, `tag-${h.id || idx}`)}
                className="cursor-pointer bg-secondary text-foreground hover:bg-primary/20 hover:text-primary border border-border text-xs font-bold rounded-xl px-3 py-1.5 transition-all select-none"
              >
                {h.hashtag}
                {copiedId === `tag-${h.id || idx}` && <Check className="h-3 w-3 ml-1 text-emerald-500 inline" />}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. MUSIC RECOMMENDATIONS ── */}
      {storyboard.music && storyboard.music.length > 0 && (
        <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-border/60">
            <div>
              <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" /> 🎵 Recommended Songs
              </h3>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Real songs and trending audios tailored for your concept and target platform.
              </p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {storyboard.music.map((m: any, idx: number) => {
              const songTitle = m.song_name || m.genre || "Featured Audio Track";
              const artistName = m.artist || "Popular Artist";
              const searchQuery = encodeURIComponent(`${songTitle} ${artistName}`);
              
              return (
                <div key={m.id || idx} className="bg-secondary/40 border border-border/60 rounded-2xl p-5 space-y-3 flex flex-col justify-between text-left relative group">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Recommended Song</span>
                        <h4 className="text-base font-extrabold text-foreground leading-tight mt-0.5">
                          🎵 {songTitle}
                        </h4>
                        <p className="text-xs font-bold text-muted-foreground mt-0.5">
                          by {artistName}
                        </p>
                      </div>
                      {m.best_scene && (
                        <Badge variant="outline" className="text-[10px] font-bold border-primary/20 text-primary bg-primary/5 rounded-md px-2 py-0.5 shrink-0">
                          Use in: {m.best_scene}
                        </Badge>
                      )}
                    </div>

                    {m.why_fits && (
                      <p className="text-xs font-semibold text-foreground/90 leading-relaxed bg-background/50 p-3 rounded-xl border border-border/40 select-text">
                        ⭐ <span className="font-bold">Why it fits:</span> {m.why_fits}
                      </p>
                    )}

                    {m.mood && (
                      <div className="flex items-center gap-2 flex-wrap text-[11px] font-semibold text-muted-foreground">
                        <span className="bg-secondary px-2.5 py-0.5 rounded-full text-foreground font-bold">Mood: {m.mood}</span>
                        {m.platform_popularity && <span className="text-emerald-600 dark:text-emerald-400 font-bold">📈 {m.platform_popularity}</span>}
                      </div>
                    )}

                    {m.royalty_free_alt && (
                      <div className="text-[11px] font-medium text-muted-foreground bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
                        🎁 <span className="font-bold text-amber-600 dark:text-amber-400">Royalty-Free Alt:</span> {m.royalty_free_alt}
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <a 
                      href={`https://open.spotify.com/search/${searchQuery}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      <Music className="h-3.5 w-3.5" /> Search Audio on Spotify / Web ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trending Audio Tags */}
          {((storyboard.music[0]?.trending_instagram?.length > 0) || (storyboard.music[0]?.trending_tiktok?.length > 0)) && (
            <div className="pt-4 border-t border-border/60 space-y-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Currently Trending Platform Audios</span>
              <div className="flex flex-wrap gap-2">
                {storyboard.music[0]?.trending_instagram?.map((audio: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-bold bg-pink-500/10 text-pink-600 dark:text-pink-400 border-none px-3 py-1 rounded-full">
                    📸 Instagram: {audio}
                  </Badge>
                ))}
                {storyboard.music[0]?.trending_tiktok?.map((audio: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-none px-3 py-1 rounded-full">
                    🎵 TikTok: {audio}
                  </Badge>
                ))}
                {storyboard.music[0]?.trending_youtube?.map((audio: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border-none px-3 py-1 rounded-full">
                    ▶️ Shorts: {audio}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── 8. POSTING TIPS & TRENDS ── */}
      {storyboard.trends && storyboard.trends.length > 0 && (
        <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
            <TrendingUp className="h-5 w-5 text-primary" /> Posting & Content Strategy Tips
          </h3>
          
          {storyboard.trends.map((t: any, idx: number) => (
            <div key={t.id || idx} className="space-y-4 text-left">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-secondary/40 border border-border/50 rounded-2xl p-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Best Posting Time</span>
                  <p className="text-foreground font-extrabold text-sm mt-1">{t.posting_time || "Peak Evening Hours (6:00 PM - 9:00 PM)"}</p>
                </div>
                <div className="bg-secondary/40 border border-border/50 rounded-2xl p-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Recommended Editing Style</span>
                  <p className="text-foreground font-extrabold text-sm mt-1">{t.editing_style || "Fast Hook + Dynamic Cuts"}</p>
                </div>
              </div>

              {t.content_gap && (
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Identified Content Opportunity</span>
                  <p className="text-xs text-foreground font-semibold leading-relaxed">
                    {t.content_gap}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── 9. REPURPOSE ── */}
      {storyboard.repurpose && (
        <section className="glass-panel rounded-3xl border border-border p-6 bg-card space-y-4">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2 pb-3 border-b border-border/60">
            <Share2 className="h-5 w-5 text-primary" /> Multi-Platform Content Repurposing
          </h3>

          {/* Repurpose Tabs */}
          <div className="flex border-b border-border/60 overflow-x-auto gap-2">
            {['instagram', 'linkedin', 'twitter', 'threads', 'newsletter', 'blog'].map((tab) => {
              const content = storyboard.repurpose[tab] || (tab === 'instagram' ? storyboard.repurpose.carousel : null);
              if (!content && !storyboard.repurpose[tab]) return null;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveRepurpose(tab)}
                  className={`py-2 px-4 text-xs font-bold border-b-2 capitalize transition-colors whitespace-nowrap ${
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

          <div className="pt-2">
            <AnimatePresence mode="wait">
              {activeRepurpose && (
                <motion.div
                  key={activeRepurpose}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="bg-secondary/30 border border-border/50 p-5 rounded-2xl text-left select-text relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        {activeRepurpose === 'linkedin' && <Linkedin className="h-4 w-4 text-[#0A66C2]" />}
                        {activeRepurpose === 'twitter' && <Twitter className="h-4 w-4 text-foreground" />}
                        {activeRepurpose === 'instagram' && <Instagram className="h-4 w-4 text-[#E1306C]" />}
                        {activeRepurpose} Optimized Copy
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copy(storyboard.repurpose[activeRepurpose] || storyboard.repurpose.carousel || "", `rep-${activeRepurpose}`)}
                        className="h-7 text-xs font-bold text-muted-foreground hover:text-foreground rounded-full px-2"
                      >
                        {copiedId === `rep-${activeRepurpose}` ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs font-semibold text-foreground leading-relaxed whitespace-pre-wrap select-text">
                      {storyboard.repurpose[activeRepurpose] || storyboard.repurpose.carousel || "Repurposed content loading..."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ── 10. GLOBAL ADVANCED SETTINGS ── */}
      <section className="glass-panel rounded-3xl border border-border p-6 bg-card/60 select-none">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sliders className="h-4 w-4 text-muted-foreground" /> Advanced AI Metadata
            </h3>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              Technical details and model prompts used for generation.
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowGlobalAdvanced(!showGlobalAdvanced)}
            className="text-xs font-bold text-muted-foreground hover:text-foreground rounded-full"
          >
            {showGlobalAdvanced ? "Hide Advanced" : "Show Advanced"}
          </Button>
        </div>

        <AnimatePresence>
          {showGlobalAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-border/60 space-y-3 text-xs font-mono text-muted-foreground"
            >
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-foreground">Project ID</span>
                <p className="select-text">{storyboard.id}</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-foreground">Status</span>
                <p className="select-text capitalize">{storyboard.status}</p>
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider block text-[10px] text-foreground">Created At</span>
                <p className="select-text">{storyboard.created_at}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </div>
  );
}
