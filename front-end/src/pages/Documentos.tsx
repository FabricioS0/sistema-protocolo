
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Eye, MapPin } from "lucide-react";
import { DocumentForm } from "@/components/DocumentForm";
import { LocationModal } from "@/components/LocationModal";
import { useToast } from "@/hooks/use-toast";

interface DocumentosProps {
  currentUser: any;
}

export const Documentos = ({ currentUser }: DocumentosProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      identificacao: "DOC-2024-001",
      nome: "Contrato de Serviços",
      descricao: "Contrato para prestação de serviços de TI",
      tipo: "Contrato",
      setor: "Tecnologia da Informação",
      local_atual: "Arquivo Central",
      criado: "2024-01-15",
      data_entrada: "2024-01-15T10:30:00",
      data_ultima: "2024-01-16T14:20:00",
      autor: "João Silva",
      responsavel_id: "1",
    },
    {
      id: 2,
      identificacao: "DOC-2024-002", 
      nome: "Relatório Mensal",
      descricao: "Relatório de atividades do mês",
      tipo: "Relatório",
      setor: "Recursos Humanos",
      local_atual: "Departamento de RH",
      criado: "2024-01-20",
      data_entrada: "2024-01-20T09:00:00",
      data_ultima: "2024-01-20T09:00:00",
      autor: "Maria Santos",
      responsavel_id: "2",
    },
    {
      id: 3,
      identificacao: "DOC-2024-003",
      nome: "Política de Segurança",
      descricao: "Documento de políticas de segurança da informação",
      tipo: "Política",
      setor: "Tecnologia da Informação",
      local_atual: "Setor de TI",
      criado: "2024-01-18",
      data_entrada: "2024-01-18T16:45:00",
      data_ultima: "2024-01-19T11:30:00",
      autor: "Pedro Costa",
      responsavel_id: "3",
    },
    {
      id: 4,
      identificacao: "DOC-2024-004",
      nome: "Manual de Procedimentos",
      descricao: "Manual de procedimentos administrativos",
      tipo: "Manual",
      setor: "Recursos Humanos",
      local_atual: "Departamento de RH",
      criado: "2024-01-22",
      data_entrada: "2024-01-22T11:00:00",
      data_ultima: "2024-01-22T11:00:00",
      autor: "Ana Lima",
      responsavel_id: "2",
    },
    {
      id: 5,
      identificacao: "DOC-2024-005",
      nome: "Relatório Financeiro",
      descricao: "Relatório trimestral de finanças",
      tipo: "Relatório",
      setor: "Financeiro",
      local_atual: "Setor Financeiro",
      criado: "2024-01-25",
      data_entrada: "2024-01-25T14:30:00",
      data_ultima: "2024-01-25T14:30:00",
      autor: "Carlos Oliveira",
      responsavel_id: "3",
    },
  ]);

  const handleNewDocument = (documentData: any) => {
    // Converter campos para o formato usado no frontend
    const newDoc = {
      id: documentos.length + 1,
      identificacao: documentData.identificacao,
      nome: documentData.nome,
      descricao: documentData.descricao,
      local_atual: documentData.localAtual, // Converter de camelCase para snake_case para o frontend
      setor: documentData.setor,
      criado: new Date().toISOString().split('T')[0],
      data_entrada: documentData.dataEntrada,
      data_ultima: documentData.dataUltimaModificacao,
      autor: currentUser?.nome || "Usuário Atual",
      tipo: "Documento",
      responsavel_id: currentUser?.id || "1",
    };

    setDocumentos([...documentos, newDoc]);
    setShowForm(false);

    console.log("Histórico criado:", {
      documento_id: newDoc.id,
      local: documentData.localAtual,
      responsavel: currentUser?.id || "1",
      data_movimentacao: new Date().toISOString(),
      observacao: "Documento criado",
    });

    toast({
      title: "Sucesso",
      description: `Documento criado no setor ${documentData.setor}`,
    });
  };

  const handleLocationChange = (documentId: string, newLocation: string, observacao: string) => {
    setDocumentos(docs => 
      docs.map(doc => {
        if (doc.id.toString() === documentId) {
          return {
            ...doc,
            local_atual: newLocation,
            data_ultima: new Date().toISOString(),
          };
        }
        return doc;
      })
    );

    console.log("Histórico criado:", {
      documento_id: documentId,
      local: newLocation,
      responsavel: currentUser?.id || "1",
      data_movimentacao: new Date().toISOString(),
      observacao: observacao || `Local alterado para ${newLocation}`,
    });
  };

  const handleEditLocation = (doc: any) => {
    setSelectedDocument(doc);
    setShowLocationModal(true);
  };

  // Filtrar documentos baseado no setor do usuário
  const getFilteredDocuments = () => {
    let filtered = documentos;

    // Se não for admin, filtrar apenas documentos do próprio setor
    if (currentUser?.tipo !== 'admin') {
      filtered = filtered.filter(doc => doc.setor === currentUser?.setor);
    }

    // Aplicar filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.identificacao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredDocuments = getFilteredDocuments();

  if (showForm) {
    return (
      <div className="space-y-6">
        <DocumentForm 
          onSubmit={handleNewDocument}
          onCancel={() => setShowForm(false)}
          currentUser={currentUser}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-blue">Documentos</h1>
          <p className="text-gray-600 mt-1">
            {currentUser?.tipo === 'admin' 
              ? 'Visualizando documentos de todos os setores' 
              : `Documentos do setor: ${currentUser?.setor}`
            }
          </p>
        </div>
        <Button 
          className="bg-navy-blue hover:bg-navy-blue/90"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      <Card className="border-light-gray">
        <CardHeader>
          <CardTitle className="text-navy-blue">Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou identificação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="border-navy-blue text-navy-blue">
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-light-gray">
        <CardHeader>
          <CardTitle className="text-navy-blue">
            Lista de Documentos ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-navy-blue">Identificação</TableHead>
                <TableHead className="text-navy-blue">Nome</TableHead>
                {currentUser?.tipo === 'admin' && (
                  <TableHead className="text-navy-blue">Setor</TableHead>
                )}
                <TableHead className="text-navy-blue">Local Atual</TableHead>
                <TableHead className="text-navy-blue">Data de Entrada</TableHead>
                <TableHead className="text-navy-blue">Última Modificação</TableHead>
                <TableHead className="text-navy-blue">Autor</TableHead>
                <TableHead className="text-navy-blue">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium text-soft-black">
                    {doc.identificacao}
                  </TableCell>
                  <TableCell className="text-soft-black">{doc.nome}</TableCell>
                  {currentUser?.tipo === 'admin' && (
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                        {doc.setor}
                      </span>
                    </TableCell>
                  )}
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {doc.local_atual}
                    </span>
                  </TableCell>
                  <TableCell className="text-soft-black">
                    {new Date(doc.data_entrada).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-soft-black">
                    {new Date(doc.data_ultima).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-soft-black">{doc.autor}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditLocation(doc)}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm 
                ? "Nenhum documento encontrado com os critérios de busca."
                : `Nenhum documento encontrado para o setor ${currentUser?.setor}.`
              }
            </div>
          )}
        </CardContent>
      </Card>

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        document={selectedDocument}
        onLocationChange={handleLocationChange}
      />
    </div>
  );
};
