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
import { StockMovement } from './pages/StockMovement.js';
import { UserList } from './pages/users/UserList.js';
import { UserForm } from './pages/users/UserForm.js';
import { StockHistory } from './pages/history/StockHistory.js';
import { Layout } from './components/Layout.js';
import { Toaster } from 'react-hot-toast';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Obras */}
          <Route path="/works" element={<WorksList />} />
          <Route path="/works/new" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<WorkForm />} />
          </Route>
          <Route path="/works/:id/edit" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<WorkForm />} />
          </Route>

          {/* Materiais */}
          <Route path="/materials" element={<MaterialsList />} />
          <Route path="/materials/new" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<MaterialForm />} />
          </Route>
          <Route path="/materials/:id/edit" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<MaterialForm />} />
          </Route>
          <Route path="/materials/:id/stock" element={<MaterialStock />} />

          {/* Depósitos */}
          <Route path="/warehouses" element={<WarehousesList />} />
          <Route path="/warehouses/new" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<WarehouseForm />} />
          </Route>
          <Route path="/warehouses/:id/edit" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<WarehouseForm />} />
          </Route>
          <Route path="/warehouses/:id/stock" element={<WarehouseStock />} />
          <Route path="/warehouses/work/:workId" element={<WarehousesList />} />

          {/* Movimentações */}
          <Route path="/stock-movement" element={<StockMovement />} />
          <Route path="/stock-history" element={<StockHistory />} />

          {/* Usuários */}
          <Route path="/users" element={<PrivateRoute requiredRole="ADMIN" />} >
            <Route index element={<UserList />} />
            <Route path="new" element={<UserForm />} />
            <Route path=":id/edit" element={<UserForm />} />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
