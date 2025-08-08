// src/hooks/useAccessToken.ts
import { useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { AuthError, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useFrontendConfig } from "./useFrontendConfig";

/**
 * Generic hook to acquire an access token for given scopes.
 */
const useAccessTokenForScopes = (scopesKey: "apiScopes" | "graphScopes") => {
  const { instance, accounts } = useMsal();
  const { data: config } = useFrontendConfig();

  const getToken = useCallback(async (): Promise<string | null> => {
    const account = accounts[0];
    const scopes = config?.[scopesKey] ?? [];

    if (!instance || !account || scopes.length === 0) return null;

    try {
      const response = await instance.acquireTokenSilent({
        scopes,
        account,
      });
      return response.accessToken;
    } catch (error) {
      console.error("Silent token acquisition failed:", error);

      if (error instanceof InteractionRequiredAuthError) {
        try {
          const interactiveResponse = await instance.acquireTokenPopup({
            scopes,
            account,
          });
          return interactiveResponse.accessToken;
        } catch (interactiveError) {
          console.error(
            "Interactive token acquisition failed:",
            interactiveError
          );
          return null;
        }
      }

      if (error instanceof AuthError) {
        console.error("Auth error:", error.message);
      }

      return null;
    }
  }, [instance, accounts, config, scopesKey]);

  return getToken;
};

/**
 * Hook to acquire an access token for your API.
 */
export const useApiAccessToken = () => useAccessTokenForScopes("apiScopes");

/**
 * Hook to acquire an access token for Microsoft Graph.
 */
export const useGraphAccessToken = () => useAccessTokenForScopes("graphScopes");
