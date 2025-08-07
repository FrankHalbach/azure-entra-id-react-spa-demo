// src/hooks/useFrontendConfig.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface FrontEndConfig {
  tenantId: string;
  clientId: string;
  redirectUri: string;
  apiScopes: string[];
  graphScopes: string[];
  authority: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const queryUrl = `${baseUrl}/config/azure-ad`;

export const useFrontendConfig = () =>
  useQuery({
    queryKey: ["frontend-config"],
    queryFn: async (): Promise<FrontEndConfig> => {
      const response = await axios.get<FrontEndConfig>(queryUrl); // adjust if needed
      if (!response.data) {
        throw new Error("Failed to fetch config");
      }

      return response.data;
    },
    staleTime: 1000 * 60 * 60, // cache for 60 min
  });
