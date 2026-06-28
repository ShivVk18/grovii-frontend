import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storyboardSchema, StoryboardFormValues } from "../lib/storyboardSchema";
import { storyboardService } from "../services/storyboardService";

export interface AIResult {
  hook: string;
  scenes: {
    duration: number;
    title: string;
    visual: string;
    cameraAngle: string;
    sound: string;
    dialogue: string;
    number: number;
    scene_image_url?: string;
  }[];
  caption: string;
  hashtags: string[];
  repurposed?: {
    twitter?: string;
    linkedin?: string;
  };
}

export const useStoryboardForm = () => {
  const [data, setData] = useState<AIResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmittingState, setIsSubmittingState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StoryboardFormValues>({
    resolver: zodResolver(storyboardSchema) as any,
    defaultValues: {
      idea: "",
      goal: "",
      tone: "",
      style: "",
      audience: "",
      duration: 30,
      platform: "",
    },
  });

  const onSubmit = async (formData: StoryboardFormValues) => {
    setApiError(null);
    setData(null);

    try {
      // Call the generate endpoint (which also creates the record internally)
      const response = await storyboardService.generateAIStoryboard({
        idea: formData.idea,
        goal: formData.goal,
        tone: formData.tone,
        style: formData.style,
        audience: formData.audience,
        duration: formData.duration,
        platform: formData.platform,
      });
      
      const rawAiResult = response.ai_result;

      // Map backend response scenes back to frontend expected structure
      const mappedScenes = rawAiResult.scenes.map((s: any, index: number) => ({
        number: index + 1,
        title: s.title || `Scene ${index + 1}`,
        duration: Math.round(formData.duration / rawAiResult.scenes.length), // distribute time evenly
        visual: s.description || s.visual_cue || "",
        cameraAngle: "Medium Shot",
        sound: rawAiResult.scene_music?.[0]?.mood || "Background ambiance",
        dialogue: s.script_segment || "",
        scene_image_url: s.scene_image_url
      }));

      const finalAiResult: AIResult = {
        hook: rawAiResult.hook || "Generated Hook",
        scenes: mappedScenes,
        caption: rawAiResult.captions?.[0] || "Generated Caption",
        hashtags: rawAiResult.hashtags || [],
        repurposed: {
          twitter: rawAiResult.repurposed_content?.twitter || "",
          linkedin: rawAiResult.repurposed_content?.linkedin || ""
        }
      };

      setData(finalAiResult);
      
    } catch (error: any) {
      console.error("Storyboard generation error:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        "An unexpected error occurred during generation.";
      setApiError(errorMessage);
    } finally {
      setIsSubmittingState(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    submitForm: onSubmit, // Export raw submit for direct calls
    errors,
    isSubmitting: isSubmitting || isSubmittingState,
    data,
    apiError,
    reset,
  };
};
