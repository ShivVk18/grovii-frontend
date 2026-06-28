import { z } from "zod";

export const storyboardSchema = z.object({
  idea: z.string().min(10, { message: "Idea must be at least 10 characters long" }),
  goal: z.string().min(1, { message: "Goal is required" }),
  tone: z.string().min(1, { message: "Tone is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  audience: z.string().min(1, { message: "Audience is required" }),
  duration: z.coerce.number().min(15, { message: "Duration must be at least 15 seconds" }).max(600, { message: "Duration cannot exceed 600 seconds" }),
  platform: z.string().min(1, { message: "Platform is required" }),
});

export type StoryboardFormValues = z.infer<typeof storyboardSchema>;
