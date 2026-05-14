import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/auth.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { HardHat } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register({ name, email, password });
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao realizar cadastro');
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
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-600">
          Junte-se à nossa plataforma de gestão
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Nome Completo"
              type="text"
              placeholder="João Silva"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />

            <Input
              label="Endereço de E-mail"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              minLength={6}
            />

            <Button
              type="submit"
              className="w-full"
              isLoading={loading}
            >
              Registrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-500">Já possui uma conta?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Fazer login agora
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
