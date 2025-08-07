// src/components/MsalInitializer.tsx
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import type { Configuration  } from '@azure/msal-browser';
import { PublicClientApplication  } from '@azure/msal-browser';
import { useFrontendConfig } from '../hooks/useFrontendConfig';
import App from '../App';

const MsalInitializer: React.FC = () => {
  const { data: config, isLoading, error } = useFrontendConfig();

  
  if (isLoading) return <div>Loading auth config...</div>;
  if (error || !config) return <div>Error loading config: {String(error)}</div>;

  const msalConfig: Configuration = {
    auth: {
      clientId: config.clientId,
      authority: config.authority,
      redirectUri: config.redirectUri,
      postLogoutRedirectUri: config.redirectUri,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },    
  };

  
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
};

export default MsalInitializer;
