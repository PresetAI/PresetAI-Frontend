import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth_context';
import { IngestProvider } from './contexts/ingest_context';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <IngestProvider>
          <App />
        </IngestProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
