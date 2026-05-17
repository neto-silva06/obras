import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  HardHat,
  Package,
  Warehouse,
  Users,
  History,
  LogOut,
  UserCheck,
  Menu,
  X,
  RefreshCw,
  CloudOff
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { db } from '../offline/db.js';
import { syncOfflineData } from '../offline/sync.js';
import toast from 'react-hot-toast';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const checkPending = async () => {
      const count = await db.syncQueue
        .where('status')
        .equals('pending')
        .count();
      setPendingCount(count);
    };

    checkPending();
    const interval = setInterval(checkPending, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleManualSync = async () => {
    if (!navigator.onLine) {
      toast.error('Sem conexão com a internet.');
      return;
    }
    setIsSyncing(true);
    await syncOfflineData();
    setIsSyncing(false);
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/works', icon: HardHat, label: 'Obras' },
    { to: '/materials', icon: Package, label: 'Materiais' },
    { to: '/warehouses', icon: Warehouse, label: 'Depósitos' },
    { to: '/employees', icon: UserCheck, label: 'Funcionários' },
    { to: '/stock-history', icon: History, label: 'Histórico' },
  ];

  if (isAdmin) {
    navItems.push({ to: '/users', icon: Users, label: 'Usuários' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const sidebarClasses = `
    w-64 bg-secondary-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="p-6 border-b border-secondary-800 flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <HardHat className="text-primary-400" />
            <span>GestãoObras</span>
          </h1>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-secondary-400 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose && onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-400 hover:bg-secondary-800 hover:text-white'
                }
              ` }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {pendingCount > 0 && (
          <div className="mx-4 mb-4 p-3 bg-secondary-800 rounded-lg border border-secondary-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-secondary-400 uppercase tracking-wider">Sincronização</span>
              <span className="bg-primary-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {pendingCount}
              </span>
            </div>
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className={`w-full flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-colors ${
                isSyncing
                  ? 'bg-secondary-700 text-secondary-500 cursor-not-allowed'
                  : 'bg-primary-600/10 text-primary-400 hover:bg-primary-600/20'
              }`}
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
              {isSyncing ? 'Sincronizando...' : 'Sincronizar Agora'}
            </button>
          </div>
        )}

        <div className="p-4 border-t border-secondary-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-xs font-bold uppercase">
              {user?.name?.substring(0, 2) || 'US'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-secondary-500 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-secondary-400 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
