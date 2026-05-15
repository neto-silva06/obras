import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.js';
import { Menu, HardHat, WifiOff } from 'lucide-react';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-secondary-900 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <HardHat className="text-primary-400" size={24} />
          <span className="font-bold">GestãoObras</span>
          {!isOnline && <WifiOff size={18} className="text-red-400 ml-2" />}
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-secondary-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="lg:pl-64 transition-all duration-300">
        {!isOnline && (
          <div className="bg-red-500 text-white text-xs text-center py-1 hidden lg:block">
            Você está operando em modo offline. As alterações serão sincronizadas quando a conexão retornar.
          </div>
        )}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
