import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Settings, Users, Shield } from "lucide-react";
import { EmployeeForm } from "@/components/EmployeeForm";
import { useToast } from "@/hooks/use-toast";

export const Administracao = () => {
  const { toast } = useToast();
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao@empresa.com",
      cargo: "Administrador",
      setor: "Tecnologia da Informação",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@empresa.com",
      cargo: "Analista",
      setor: "Recursos Humanos",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro@empresa.com",
      cargo: "Assistente",
      setor: "Financeiro",
      status: "Inativo",
    },
  ]);

  const handleNewEmployee = (employeeData: any) => {
    const newEmployee = {
      id: usuarios.length + 1,
      email: `${employeeData.nome.toLowerCase().replace(' ', '.')}@empresa.com`,
      ...employeeData,
    };

    setUsuarios([...usuarios, newEmployee]);
    setShowEmployeeForm(false);
  };

  if (showEmployeeForm) {
    return (
      <div className="space-y-6">
        <EmployeeForm 
          onSubmit={handleNewEmployee}
          onCancel={() => setShowEmployeeForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-navy-blue">Administração</h1>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-light-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-soft-black">
              Total de Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-navy-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-blue">{usuarios.length}</div>
            <p className="text-xs text-gray-600">+2 desde o último mês</p>
          </CardContent>
        </Card>

        <Card className="border-light-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-soft-black">
              Configurações
            </CardTitle>
            <Settings className="h-4 w-4 text-navy-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-blue">8</div>
            <p className="text-xs text-gray-600">Módulos ativos</p>
          </CardContent>
        </Card>

        <Card className="border-light-gray">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-soft-black">
              Permissões
            </CardTitle>
            <Shield className="h-4 w-4 text-navy-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-blue">5</div>
            <p className="text-xs text-gray-600">Grupos de acesso</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-light-gray">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-navy-blue">Gerenciar Funcionários</CardTitle>
              <Button 
                size="sm" 
                className="bg-navy-blue hover:bg-navy-blue/90"
                onClick={() => setShowEmployeeForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Funcionário
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-navy-blue">Nome</TableHead>
                  <TableHead className="text-navy-blue">Cargo/Setor</TableHead>
                  <TableHead className="text-navy-blue">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-soft-black">{usuario.nome}</div>
                        <div className="text-sm text-gray-600">{usuario.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-soft-black">
                      <div>
                        <div className="font-medium">{usuario.cargo}</div>
                        <div className="text-sm text-gray-600">{usuario.setor}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        usuario.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {usuario.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        
        <Card className="border-light-gray">
          <CardHeader>
            <CardTitle className="text-navy-blue">Configurações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sistema-nome" className="text-soft-black">Nome do Sistema</Label>
              <Input
                id="sistema-nome"
                defaultValue="Sistema de Documentação"
                className="border-light-gray"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-admin" className="text-soft-black">Email do Administrador</Label>
              <Input
                id="email-admin"
                type="email"
                defaultValue="admin@sistema.com"
                className="border-light-gray"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="versao" className="text-soft-black">Versão</Label>
              <Input
                id="versao"
                defaultValue="1.0.0"
                className="border-light-gray"
              />
            </div>
            
            <Button className="w-full bg-navy-blue hover:bg-navy-blue/90">
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
