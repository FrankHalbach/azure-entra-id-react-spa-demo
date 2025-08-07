// src/hooks/useUserProfileQuery.ts
import { useQuery } from '@tanstack/react-query';
import { useIsAuthenticated } from '@azure/msal-react';
import { useApiService } from './useApiService';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const useUserProfileQuery = () => {

  const { get } = useApiService();
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    queryKey: ['user-profile'],
    queryFn: async (): Promise<UserProfile> => {
      const response = await get<UserProfile>('/user/profile');
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch user profile');
      }
      
      if (!response.data) {
        throw new Error('No user data received');
      }
      
      return response.data;
    },
    enabled: isAuthenticated, // Only run query when authenticated
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes('401')) return false;
      if (error instanceof Error && error.message.includes('403')) return false;
      return failureCount < 3;
    },
  });
};