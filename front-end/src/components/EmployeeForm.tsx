
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Briefcase, Building } from "lucide-react";

interface EmployeeFormProps {
  onSubmit: (employee: any) => void;
  onCancel: () => void;
}

export const EmployeeForm = ({ onSubmit, onCancel }: EmployeeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    senha: "",
    cargo: "",
    setor: "",
  });

  // Dados fictícios de cargos e setores
  const cargos = [
    "Gerente",
    "Analista",
    "Assistente",
    "Coordenador",
    "Supervisor",
    "Técnico",
    "Estagiário",
  ];

  const setores = [
    "Recursos Humanos",
    "Tecnologia da Informação",
    "Financeiro",
    "Comercial",
    "Marketing",
    "Operações",
    "Jurídico",
    "Administrativo",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.senha || !formData.cargo || !formData.setor) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const funcionarioData = {
      ...formData,
      data_criacao: new Date().toISOString(),
      status: "Ativo",
    };

    onSubmit(funcionarioData);
    
    toast({
      title: "Sucesso",
      description: "Funcionário criado com sucesso!",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-navy-blue flex items-center gap-2">
          <User className="h-5 w-5" />
          Criar Novo Funcionário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-soft-black flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome Completo *
            </Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Digite o nome completo"
              className="border-light-gray"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-soft-black flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Senha *
            </Label>
            <Input
              id="senha"
              type="password"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              placeholder="Digite a senha"
              className="border-light-gray"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-soft-black flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Cargo *
              </Label>
              <Select value={formData.cargo} onValueChange={(value) => setFormData({ ...formData, cargo: value })}>
                <SelectTrigger className="border-light-gray">
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {cargos.map((cargo) => (
                    <SelectItem key={cargo} value={cargo}>
                      {cargo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-soft-black flex items-center gap-2">
                <Building className="h-4 w-4" />
                Setor *
              </Label>
              <Select value={formData.setor} onValueChange={(value) => setFormData({ ...formData, setor: value })}>
                <SelectTrigger className="border-light-gray">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores.map((setor) => (
                    <SelectItem key={setor} value={setor}>
                      {setor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-navy-blue hover:bg-navy-blue/90 flex-1">
              Criar Funcionário
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="border-navy-blue text-navy-blue">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
