import { api } from './api';
import { CreateStoryboardRequest, GenerateStoryboardResponse, Storyboard } from '../types';

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

  async updateStoryboard(id: string, data: any): Promise<Storyboard> {
    const response = await api.patch<Storyboard>(`/storyboards/${id}`, data);
    return response.data;
  },

  async deleteStoryboard(id: string): Promise<boolean> {
    const response = await api.delete(`/storyboards/${id}`);
    return response.data;
  },

  async generateAIStoryboard(data: CreateStoryboardRequest): Promise<GenerateStoryboardResponse> {
    // Note: This endpoint is potentially long-running, consider configuring a higher timeout if needed
    const response = await api.post<GenerateStoryboardResponse>('/storyboards/generate', data);
    return response.data;
  },

  async getJobs(): Promise<any[]> {
    const response = await api.get<any[]>('/storyboards/jobs');
    return response.data;
  },

  async getJobStatus(jobId: string): Promise<any> {
    const response = await api.get<any>(`/storyboards/jobs/${jobId}`);
    return response.data;
  }
};
