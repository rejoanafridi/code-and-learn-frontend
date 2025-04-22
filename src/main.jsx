import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import { ClerkProvider } from '@clerk/clerk-react';
import i18n from './i18n';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <App />
          <Toaster position="bottom-right" />
        </AuthProvider>
      </I18nextProvider>
    </ClerkProvider>
  </React.StrictMode>
);
