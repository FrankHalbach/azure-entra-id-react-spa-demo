// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
  
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MsalInitializer from './components/MsalInitializer';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MsalInitializer />
    </QueryClientProvider>
  </React.StrictMode>
);