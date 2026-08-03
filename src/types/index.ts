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

export interface Scene {
  id: string;
  storyboard_id: string;
  order: number;
  title: string;
  description: string;
  visual_cue: string;
  script_segment: string;
  scene_prompt?: string;
  negative_prompt?: string;
  scene_image_url?: string;
  image_status: 'pending' | 'generating' | 'completed' | 'failed';
  created_at?: string;
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
  status: string;
  script?: string;
  thumbnail_url?: string;
  thumbnail_status?: string;
  created_at: string;
  updated_at: string;
  scenes?: Scene[];
}

export interface CreateStoryboardRequest {
  idea: string;
  goal: string;
  tone: string;
  style: string;
  audience: string;
  duration: number;
  platform: string;
}

export interface AIResult {
  idea: string;
  goal: string;
  tone: string;
  style: string;
  audience: string;
  duration: number;
  platform: string;
  hook: string;
  scenes: any[];
  script: string;
  captions: any[];
  hashtags: any[];
  regenerated_hooks: any[];
  trends: any;
  scene_music: any[];
  repurposed_content: any;
  thumbnail_url: string;
}

export interface GenerateStoryboardResponse {
  job_id: string;
  storyboard_id: string;
  status: string;
}
