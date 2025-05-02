import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AtSign, KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api'; // Importa o Axios configurado
import { useNavigate } from 'react-router-dom'; // Para redirecionar após login

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token } = response.data;

      localStorage.setItem('token', token);

      toast.success('Login realizado com sucesso!');

      onLoginSuccess(); // <-- chama a função para avisar o Index.tsx
      
    } catch (error) {
      console.error('Erro ao fazer login', error);
      toast.error('E-mail ou senha inválidos!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Entre com sua conta para acessar suas despesas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="seu.email@exemplo.com"
                className="pl-10"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                Esqueceu a senha?
              </Button>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-expense-purple hover:bg-expense-purple/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Button variant="link" className="p-0 text-expense-purple">
              Registre-se
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

