import axios from 'axios';
import { SearchParams, SearchResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for scraping operations
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchMarketplace = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await api.post<SearchResponse>('/search', params);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Search failed: ${errorMessage}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};