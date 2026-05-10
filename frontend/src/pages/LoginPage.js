import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { authService } from '../api/auth.service.js';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await authService.login(email, password);
            login(data.token, data.user);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Erro ao realizar login');
        }
    };
    return (_jsx("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }, children: _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }, children: [_jsx("h2", { children: "Login" }), error && _jsx("p", { style: { color: 'red' }, children: error }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("input", { type: "password", placeholder: "Senha", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", { type: "submit", children: "Entrar" }), _jsx("a", { href: "/register", children: "N\u00E3o tem conta? Cadastre-se" })] }) }));
};
export default LoginPage;
//# sourceMappingURL=LoginPage.js.map