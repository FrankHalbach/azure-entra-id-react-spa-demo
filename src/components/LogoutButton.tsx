import React from "react";
import { useMsal } from "@azure/msal-react";
import { useFrontendConfig } from "../hooks/useFrontendConfig";

export const LogoutButton: React.FC = () => {
  const { instance } = useMsal();
  const { data: frontendConfig, isLoading } = useFrontendConfig();
  if (isLoading) return <button disabled>Loading...</button>;

  if (!frontendConfig) {
    console.error("Frontend config is not available for logout.");
    return null;
  }

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: frontendConfig.redirectUri,
      mainWindowRedirectUri: frontendConfig.redirectUri,
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Sign Out
    </button>
  );
};
