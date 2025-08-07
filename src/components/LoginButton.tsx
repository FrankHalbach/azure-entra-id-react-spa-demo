import { useMsal } from '@azure/msal-react';
import React from 'react';
import { useFrontendConfig } from '../hooks/useFrontendConfig';

const LoginButton: React.FC = () => {
  const { instance } = useMsal();

  const { data: frontendConfig, isLoading   } = useFrontendConfig()

  const handleLogin = async () => {
     if (!frontendConfig) return;

    instance.loginPopup({
         scopes: frontendConfig.scopes
    });
  };

  
  if (isLoading) return <button disabled>Loading...</button>;

   return (
    <button 
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Sign in with Microsoft
    </button>
  );
};

export default LoginButton;