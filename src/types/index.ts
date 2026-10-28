export interface User {
  id: string;
  email: string;
  username: string;
  credits?: number;
  plan?: string;
  avatar_url?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface AdvancedSceneDetails {
  camera_angle?: string;
  camera_movement?: string;
  lighting?: string;
  transition?: string;
  music?: string;
  scene_prompt?: string;
  negative_prompt?: string;
  reference_prompt?: string;
  image_generation_prompt?: string;
  director_notes?: string;
  technical_settings?: string;
}

export interface Scene {
  id: string;
  storyboard_id: string;
  scene_number: number;
  title: string;
  duration: string;
  /** Seconds from the start of the video (Phase D). */
  start_seconds?: number;
  end_seconds?: number;
  what_to_show?: string;
  voiceover_example?: string;
  onscreen_text?: string;
  what_to_record?: string;
  what_to_say?: string;
  tips?: string;
  emotion?: string;
  advanced?: AdvancedSceneDetails;
  
  // Legacy / fallback fields
  camera_angle?: string;
  camera_movement?: string;
  lighting?: string;
  transition?: string;
  music_mood?: string;
  script_segment?: string;
  scene_prompt?: string;
  negative_prompt?: string;
  broll?: string;
  created_at?: string;
}

export interface MusicItem {
  id: string;
  song_name?: string;
  artist?: string;
  why_fits?: string;
  /** Always false: suggestions are unverified style references (Phase D). */
  verified?: boolean;
  licensing_note?: string;
  best_scene?: string;
  mood?: string;
  platform_popularity?: string;
  royalty_free_alt?: string;
  trending_instagram?: string[];
  trending_tiktok?: string[];
  trending_youtube?: string[];
  genre?: string;
}

export interface Storyboard {
  id: string;
  user_id: string;
  title: string;
  idea: string;
  goal: string;
  tone: string;
  style: string;
  audience: string;
  duration: number;
  platform: string;
  language?: string;
  /** Creator constraints the plan respected (Phase D). */
  constraints?: { faceless: boolean; location?: string | null; equipment?: string | null } | null;
  /** For broad ideas: the concrete example the planner chose (Phase D). */
  brief_choice?: string | null;
  /** Plain-language note for partial/failed storyboards or missing parts. */
  status_reason?: string | null;
  status: string;
  hook?: string;
  script?: string;
  thumbnail_url?: string;
  thumbnail_status?: string;
  created_at: string;
  updated_at: string;
  scenes?: Scene[];
  captions?: { id: string; caption: string }[];
  hashtags?: { id: string; hashtag: string }[];
  hooks?: { id: string; hook: string; selected: boolean }[];
  music?: MusicItem[];
  trends?: TrendItem[];
  repurpose?: RepurposeContent | null;
}

/** Posting guidance generated per storyboard (backend TrendResponse). */
export interface TrendItem {
  id: string;
  posting_time?: string | null;
  editing_style?: string | null;
  content_gap?: string | null;
  transitions?: string[] | null;
  sounds?: string[] | null;
}

/** Written posts made from the video idea (backend RepurposeResponse). */
export interface RepurposeContent {
  id: string;
  linkedin?: string | null;
  twitter?: string | null;
  carousel?: string | null;
  blog?: string | null;
  newsletter?: string | null;
}

export interface CreateStoryboardRequest {
  idea: string;
  goal: string;
  tone: string;
  style: string;
  audience: string;
  duration: number;
  platform: string;
  language?: string;
  /** Optional creator constraints (Phase D). */
  faceless?: boolean;
  location?: string;
  equipment?: string;
}

export interface GenerateStoryboardResponse {
  job_id: string;
  storyboard_id: string;
  status: string;
}

/**
 * Error body returned by the Grovii API (since Phase B).
 * `detail` is always a human-readable string that can be shown as-is.
 *   422 validation_error      -> `errors` maps field name to message
 *   402 insufficient_credits  -> `credits` is the remaining balance
 *   429 rate_limited          -> `retry_after` seconds (also Retry-After header)
 *   429 too_many_active_jobs  -> wait for a running generation to finish
 *   503 daily_limit_reached   -> generation paused until tomorrow (UTC)
 */
export type ApiErrorCode =
  | "validation_error"
  | "insufficient_credits"
  | "rate_limited"
  | "too_many_active_jobs"
  | "daily_limit_reached";

export interface ApiErrorBody {
  detail: string;
  code?: ApiErrorCode;
  errors?: Record<string, string>;
  credits?: number;
  retry_after?: number;
}

/** Job lifecycle statuses returned by GET /storyboards/jobs/{id} (since Phase C). */
export type JobStatus = "queued" | "running" | "completed" | "failed" | "cancelled";

/** Storyboard statuses. `partial` = usable but incomplete; see `status_reason`. */
export type StoryboardStatus =
  | "draft" | "created" | "queued" | "running" | "completed" | "partial" | "failed" | "cancelled";
