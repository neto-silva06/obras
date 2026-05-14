import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsxs(Route, { element: _jsx(PrivateRoute, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/works", element: _jsx(WorksList, {}) }), _jsx(Route, { path: "/works/new", element: _jsx(WorkForm, {}) }), _jsx(Route, { path: "/works/:id/edit", element: _jsx(WorkForm, {}) }), _jsx(Route, { path: "/materials", element: _jsx(MaterialsList, {}) }), _jsx(Route, { path: "/materials/new", element: _jsx(MaterialForm, {}) }), _jsx(Route, { path: "/materials/:id/edit", element: _jsx(MaterialForm, {}) }), _jsx(Route, { path: "/materials/:id/stock", element: _jsx(MaterialStock, {}) }), _jsx(Route, { path: "/warehouses", element: _jsx(WarehousesList, {}) }), _jsx(Route, { path: "/warehouses/new", element: _jsx(WarehouseForm, {}) }), _jsx(Route, { path: "/warehouses/:id/edit", element: _jsx(WarehouseForm, {}) }), _jsx(Route, { path: "/warehouses/:id/stock", element: _jsx(WarehouseStock, {}) }), _jsx(Route, { path: "/warehouses/work/:workId", element: _jsx(WarehousesList, {}) }), _jsx(Route, { path: "/stock-movement", element: _jsx(StockMovement, {}) })] }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) })] }));
};
function App() {
    return (_jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsx(AppRoutes, {}) }) }));
}
export default App;
//# sourceMappingURL=App.js.map