import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  HardHat,
  Package,
  Warehouse,
  Users,
  History,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';

export function Sidebar() {
  const { logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/works', icon: HardHat, label: 'Obras' },
    { to: '/materials', icon: Package, label: 'Materiais' },
    { to: '/warehouses', icon: Warehouse, label: 'Depósitos' },
    { to: '/stock-history', icon: History, label: 'Histórico' },
  ];

  if (isAdmin) {
    navItems.push({ to: '/users', icon: Users, label: 'Usuários' });
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-secondary-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl">
      <div className="p-6 border-b border-secondary-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <HardHat className="text-primary-400" />
          <span>GestãoObras</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${isActive
                ? 'bg-primary-600 text-white'
                : 'text-secondary-400 hover:bg-secondary-800 hover:text-white'
              }
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

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
  );
}
