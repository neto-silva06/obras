import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.js';
import PrivateRoute from './routes/PrivateRoute.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import { Dashboard } from './pages/Dashboard.js';
import { WorksList } from './pages/works/WorksList.js';
import { WorkForm } from './pages/works/WorkForm.js';
import { MaterialsList } from './pages/materials/MaterialsList.js';
import { MaterialForm } from './pages/materials/MaterialForm.js';
import { MaterialStock } from './pages/materials/MaterialStock.js';
import { WarehousesList } from './pages/warehouses/WarehousesList.js';
import { WarehouseForm } from './pages/warehouses/WarehouseForm.js';
import { WarehouseStock } from './pages/warehouses/WarehouseStock.js';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Obras */}
        <Route path="/works" element={<WorksList />} />
        <Route path="/works/new" element={<WorkForm />} />
        <Route path="/works/:id/edit" element={<WorkForm />} />

        {/* Materiais */}
        <Route path="/materials" element={<MaterialsList />} />
        <Route path="/materials/new" element={<MaterialForm />} />
        <Route path="/materials/:id/edit" element={<MaterialForm />} />
        <Route path="/materials/:id/stock" element={<MaterialStock />} />

        {/* Depósitos */}
        <Route path="/warehouses" element={<WarehousesList />} />
        <Route path="/warehouses/new" element={<WarehouseForm />} />
        <Route path="/warehouses/:id/edit" element={<WarehouseForm />} />
        <Route path="/warehouses/:id/stock" element={<WarehouseStock />} />
        <Route path="/warehouses/work/:workId" element={<WarehousesList />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
