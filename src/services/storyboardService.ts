import { api } from './api';
import type {
  CreateStoryboardRequest, GenerateStoryboardResponse, JobStatus, Storyboard,
} from '../types';

/** GET /storyboards/jobs/{id} (backend src/api/storyboard.py). */
export interface JobStatusResponse {
  id: string;
  status: JobStatus;
  storyboard_id: string;
  progress: number;
  /** Already user-safe text (backend job_lifecycle.USER_MESSAGES). */
  error_message: string | null;
  created_at: string | null;
  completed_at: string | null;
}

/** GET /storyboards/jobs list item. */
export interface JobListItem extends JobStatusResponse {
  storyboard_title: string | null;
  started_at: string | null;
}

export const storyboardService = {
  async getStoryboards(): Promise<Storyboard[]> {
    const response = await api.get<Storyboard[]>('/storyboards');
    return response.data;
  },

  async getStoryboard(id: string): Promise<Storyboard> {
    const response = await api.get<Storyboard>(`/storyboards/${id}`);
    return response.data;
  },

  async createStoryboard(data: CreateStoryboardRequest): Promise<Storyboard> {
    const response = await api.post<Storyboard>('/storyboards', data);
    return response.data;
  },

  async updateStoryboard(id: string, data: Partial<CreateStoryboardRequest> & { title?: string }): Promise<Storyboard> {
    const response = await api.patch<Storyboard>(`/storyboards/${id}`, data);
    return response.data;
  },

  async deleteStoryboard(id: string): Promise<boolean> {
    const response = await api.delete(`/storyboards/${id}`);
    return response.data;
  },

  /** Starts a generation in the background and returns at once (Phase C). */
  async generateAIStoryboard(data: CreateStoryboardRequest): Promise<GenerateStoryboardResponse> {
    const response = await api.post<GenerateStoryboardResponse>('/storyboards/generate', data);
    return response.data;
  },

  /** Generate again with the inputs stored on an existing storyboard. */
  async regenerateFrom(storyboardId: string): Promise<GenerateStoryboardResponse> {
    const sb = await this.getStoryboard(storyboardId);
    const c = sb.constraints || null;
    return this.generateAIStoryboard({
      idea: sb.idea,
      goal: sb.goal,
      tone: sb.tone,
      style: sb.style,
      audience: sb.audience,
      duration: sb.duration,
      platform: sb.platform,
      language: sb.language || 'English',
      faceless: !!c?.faceless,
      ...(c?.location ? { location: c.location } : {}),
      ...(c?.equipment ? { equipment: c.equipment } : {}),
    });
  },

  /** Errors propagate so pages can show an error state instead of an empty list. */
  async getJobs(): Promise<JobListItem[]> {
    const response = await api.get<JobListItem[]>('/storyboards/jobs');
    return response.data;
  },

  async getJobStatus(jobId: string): Promise<JobStatusResponse> {
    const response = await api.get<JobStatusResponse>(`/storyboards/jobs/${jobId}`);
    return response.data;
  },

  /** Only works while the job is still waiting to start (409 otherwise). */
  async cancelJob(jobId: string): Promise<void> {
    await api.post(`/storyboards/jobs/${jobId}/cancel`);
  },
};
