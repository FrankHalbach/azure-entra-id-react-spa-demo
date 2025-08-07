// src/hooks/useApiService.ts
import { useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { useAccessToken } from './useAccessToken';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: number;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useApiService = () => {
  const getToken = useAccessToken();

  const makeAuthenticatedRequest = useCallback(async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> => {
    const token = await getToken();
    
    const config = {
      method,
      url: `${baseUrl}${endpoint}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data
    };

    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios(config);
      return response.data;
    } catch (error) {
      console.error('API request failed:', error);
      
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.message || 
                          axiosError.response?.data?.error || 
                          'Request failed';
      
      return {
        success: false,
        message: errorMessage,
        timestamp: Date.now()
      };
    }
  }, [getToken]);

  return {
    makeAuthenticatedRequest,
    get: useCallback(<T>(endpoint: string) => 
      makeAuthenticatedRequest<T>('GET', endpoint), [makeAuthenticatedRequest]),
    post: useCallback(<T>(endpoint: string, data: unknown) => 
      makeAuthenticatedRequest<T>('POST', endpoint, data), [makeAuthenticatedRequest]),
    put: useCallback(<T>(endpoint: string, data: unknown) => 
      makeAuthenticatedRequest<T>('PUT', endpoint, data), [makeAuthenticatedRequest]),
    delete: useCallback(<T>(endpoint: string) => 
      makeAuthenticatedRequest<T>('DELETE', endpoint), [makeAuthenticatedRequest]),
  };
};