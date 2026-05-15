import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
<<<<<<< HEAD
import { syncOfflineData } from './offline/sync.js';

// Register service worker for PWA
registerSW({
  immediate: true,
  onRegistered(r: ServiceWorkerRegistration | undefined) {
    console.log('SW Registered', r);
  }
});

// Initial sync check
syncOfflineData();
=======

// Registra o service worker para atualizações automáticas
registerSW({ immediate: true });
>>>>>>> main

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
