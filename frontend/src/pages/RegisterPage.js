import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/auth.service.js';
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.passwordConfirmation) {
            setError('As senhas não coincidem');
            return;
        }
        try {
            await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            alert('Cadastro realizado com sucesso!');
            navigate('/login');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Erro ao realizar cadastro');
        }
    };
    return (_jsx("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }, children: _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }, children: [_jsx("h2", { children: "Cadastro" }), error && _jsx("p", { style: { color: 'red' }, children: error }), _jsx("input", { name: "name", placeholder: "Nome Completo", onChange: handleChange, required: true }), _jsx("input", { name: "email", type: "email", placeholder: "Email", onChange: handleChange, required: true }), _jsx("input", { name: "password", type: "password", placeholder: "Senha", onChange: handleChange, required: true }), _jsx("input", { name: "passwordConfirmation", type: "password", placeholder: "Confirmar Senha", onChange: handleChange, required: true }), _jsx("button", { type: "submit", children: "Cadastrar" }), _jsx("a", { href: "/login", children: "J\u00E1 tem conta? Fa\u00E7a login" })] }) }));
};
export default RegisterPage;
//# sourceMappingURL=RegisterPage.js.map