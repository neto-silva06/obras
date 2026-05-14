import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../api/auth.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { HardHat } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      login(data.token, data.user);
      toast.success('Bem-vindo de volta!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
            <HardHat size={32} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
          Acesse sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-600">
          Gerenciamento profissional de obras e estoque
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Endereço de E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-500">Ainda não tem conta?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button variant="outline" className="w-full">
                  Criar nova conta
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
