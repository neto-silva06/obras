import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('@Obras:token', response.data.token);
      navigate('/dashboard');
    } catch (error) { alert('Erro ao fazer login'); }
  }
  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
