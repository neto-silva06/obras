import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login", replace: true });
};
export default PrivateRoute;
//# sourceMappingURL=PrivateRoute.js.map