
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogIn, User } from "lucide-react";

interface LoginProps {
  onLogin: (userData: any) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  // Usuários fictícios com diferentes setores
  const usuarios = [
    {
      id: "1",
      nome: "João Silva",
      username: "joao.silva",
      senha: "123456",
      cargo: "Gerente",
      setor: "Recursos Humanos",
      tipo: "funcionario"
    },
    {
      id: "2", 
      nome: "Maria Santos",
      username: "maria.santos",
      senha: "123456",
      cargo: "Analista",
      setor: "Tecnologia da Informação",
      tipo: "funcionario"
    },
    {
      id: "3",
      nome: "Pedro Costa", 
      username: "pedro.costa",
      senha: "123456",
      cargo: "Coordenador",
      setor: "Financeiro",
      tipo: "funcionario"
    },
    {
      id: "admin",
      nome: "Administrador",
      username: "admin",
      senha: "admin123",
      cargo: "Administrador",
      setor: "Administração",
      tipo: "admin"
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    let usuario = null;
    
    if (selectedUser) {
      usuario = usuarios.find(u => u.id === selectedUser);
    } else if (username && password) {
      usuario = usuarios.find(u => 
        u.username === username && u.senha === password
      );
    }
    
    if (usuario) {
      // Salvar dados do usuário no localStorage para persistência
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      onLogin(usuario);
    } else {
      alert("Credenciais inválidas!");
    }
  };

  const handleQuickLogin = (userId: string) => {
    const usuario = usuarios.find(u => u.id === userId);
    if (usuario) {
      localStorage.setItem('currentUser', JSON.stringify(usuario));
      onLogin(usuario);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-navy-blue rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold">DOC</span>
          </div>
          <CardTitle className="text-2xl text-navy-blue">Sistema de Documentação</CardTitle>
          <p className="text-gray-600">Faça login para continuar</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Login rápido para demonstração */}
          <div className="space-y-3">
            <Label className="text-soft-black">Acesso Rápido (Demonstração)</Label>
            <div className="grid grid-cols-1 gap-2">
              {usuarios.map((user) => (
                <Button
                  key={user.id}
                  variant="outline"
                  className="justify-start text-left h-auto p-3"
                  onClick={() => handleQuickLogin(user.id)}
                >
                  <div>
                    <div className="font-medium">{user.nome}</div>
                    <div className="text-xs text-gray-500">
                      {user.cargo} - {user.setor}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Ou use credenciais</span>
            </div>
          </div>

          {/* Login tradicional */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
            </div>

            <Button type="submit" className="w-full bg-navy-blue hover:bg-navy-blue/90">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
