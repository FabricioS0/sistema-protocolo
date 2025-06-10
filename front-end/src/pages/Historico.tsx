
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, User, Edit } from "lucide-react";

export const Historico = () => {
  const historico = [
    {
      id: 1,
      acao: "Documento criado",
      documento: "Contrato de Serviços",
      usuario: "João Silva",
      data: "2024-01-15 10:30",
      tipo: "criacao",
    },
    {
      id: 2,
      acao: "Status alterado para 'Aprovado'",
      documento: "Contrato de Serviços",
      usuario: "Maria Santos",
      data: "2024-01-16 14:20",
      tipo: "aprovacao",
    },
    {
      id: 3,
      acao: "Documento editado",
      documento: "Relatório Mensal",
      usuario: "Pedro Costa",
      data: "2024-01-18 09:15",
      tipo: "edicao",
    },
    {
      id: 4,
      acao: "Documento criado",
      documento: "Política de Segurança",
      usuario: "Ana Oliveira",
      data: "2024-01-20 16:45",
      tipo: "criacao",
    },
  ];

  const getActionIcon = (tipo: string) => {
    switch (tipo) {
      case "criacao":
        return <FileText className="h-4 w-4" />;
      case "edicao":
        return <Edit className="h-4 w-4" />;
      case "aprovacao":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getActionColor = (tipo: string) => {
    switch (tipo) {
      case "criacao":
        return "bg-blue-100 text-blue-800";
      case "edicao":
        return "bg-yellow-100 text-yellow-800";
      case "aprovacao":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-navy-blue">Histórico de Atividades</h1>
      </div>

      <Card className="border-light-gray">
        <CardHeader>
          <CardTitle className="text-navy-blue">Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historico.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-4 bg-light-gray rounded-lg">
                <div className={`p-2 rounded-full ${getActionColor(item.tipo)}`}>
                  {getActionIcon(item.tipo)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-soft-black">{item.acao}</h3>
                    <span className="text-sm text-gray-600">{item.data}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">
                    Documento: <span className="font-medium">{item.documento}</span>
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-600">{item.usuario}</span>
                    <Badge variant="outline" className="ml-2">
                      {item.tipo}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-light-gray">
        <CardHeader>
          <CardTitle className="text-navy-blue">Estatísticas do Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-light-gray rounded-lg">
              <div className="text-2xl font-bold text-navy-blue">24</div>
              <div className="text-sm text-gray-600">Documentos Criados</div>
            </div>
            <div className="text-center p-4 bg-light-gray rounded-lg">
              <div className="text-2xl font-bold text-navy-blue">18</div>
              <div className="text-sm text-gray-600">Aprovações</div>
            </div>
            <div className="text-center p-4 bg-light-gray rounded-lg">
              <div className="text-2xl font-bold text-navy-blue">32</div>
              <div className="text-sm text-gray-600">Edições</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
