import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';
export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('@Obras:token', response.data.token);
            navigate('/dashboard');
        }
        catch (error) {
            alert('Erro ao fazer login');
        }
    }
    return (_jsx("div", { className: "p-8", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "Email" }), _jsx("input", { type: "password", value: password, onChange: e => setPassword(e.target.value), placeholder: "Senha" }), _jsx("button", { type: "submit", children: "Entrar" })] }) }));
}
//# sourceMappingURL=Login.js.map