import React from 'react';
import { useMsal } from '@azure/msal-react';

export const LogoutButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: '/',
      mainWindowRedirectUri: '/'
    });
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 absolute top-4 right-4 z-50"
    >
      Sign Out
    </button>
  );
};