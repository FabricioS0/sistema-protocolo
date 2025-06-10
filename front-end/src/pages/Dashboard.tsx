
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  currentUser: any;
}

export const Dashboard = ({ currentUser }: DashboardProps) => {
  const navigate = useNavigate();

  // Estatísticas baseadas no setor do usuário (simuladas)
  const getStatsForSector = (setor: string) => {
    const sectorStats = {
      "Recursos Humanos": { total: 45, pendentes: 8, aprovados: 35, atencao: 2 },
      "Tecnologia da Informação": { total: 89, pendentes: 12, aprovados: 71, atencao: 6 },
      "Financeiro": { total: 67, pendentes: 15, aprovados: 48, atencao: 4 },
      "Administração": { total: 245, pendentes: 18, aprovados: 201, atencao: 26 }, // Admin vê tudo
    };
    
    return sectorStats[setor] || { total: 0, pendentes: 0, aprovados: 0, atencao: 0 };
  };

  const sectorStats = getStatsForSector(currentUser?.setor);

  const stats = [
    {
      title: "Total de Documentos",
      value: sectorStats.total.toString(),
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Pendentes",
      value: sectorStats.pendentes.toString(),
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Aprovados",
      value: sectorStats.aprovados.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Requer Atenção",
      value: sectorStats.atencao.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ];

  const handleNewDocument = () => {
    navigate("/documentos");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-blue">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {currentUser?.tipo === 'admin' 
              ? 'Visão geral de todos os setores' 
              : `Documentos do setor: ${currentUser?.setor}`
            }
          </p>
        </div>
        <Button 
          className="bg-navy-blue hover:bg-navy-blue/90"
          onClick={handleNewDocument}
        >
          Novo Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-light-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-soft-black">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy-blue">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-light-gray">
          <CardHeader>
            <CardTitle className="text-navy-blue">Documentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                  <div>
                    <p className="font-medium text-soft-black">Documento {item}</p>
                    <p className="text-sm text-gray-600">Criado há {item} dias</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Pendente
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-light-gray">
          <CardHeader>
            <CardTitle className="text-navy-blue">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 bg-light-gray rounded-lg">
                  <div className="w-2 h-2 bg-navy-blue rounded-full"></div>
                  <div>
                    <p className="text-sm text-soft-black">
                      Documento {item} foi atualizado
                    </p>
                    <p className="text-xs text-gray-600">há {item} horas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
