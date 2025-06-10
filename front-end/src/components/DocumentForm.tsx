
import { Setor } from "@/types/enums";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, FileText, Upload, MapPin } from "lucide-react";

interface DocumentFormProps {
  onSubmit: (document: any) => void;
  onCancel: () => void;
  currentUser?: any;
}

export const DocumentForm = ({ onSubmit, onCancel, currentUser }: DocumentFormProps) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    identificacao: "",
    nome: "",
    descricao: "",
    localAtual: "",
    setor: "LICITACAO"
  });

  const [anexos, setAnexos] = useState<FileList | null>(null);

  // Usar os setores da empresa como locais
  const locaisEmpresa = Object.entries(Setor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identificacao || !formData.nome || !formData.localAtual) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Converter para o formato esperado pelo backend
    const documentoData = {
      identificacao: formData.identificacao,
      nome: formData.nome,
      descricao: formData.descricao,
      localAtual: formData.localAtual,
      setor: formData.setor,
      dataEntrada: new Date().toISOString(),
      dataUltimaModificacao: new Date().toISOString(),
      anexos: anexos ? Array.from(anexos) : [],
      status: "Recebido", // Status inicial baseado na entrada
    };

    onSubmit(documentoData);

    toast({
      title: "Sucesso",
      description: "Documento registrado com sucesso!",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-navy-blue flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Registrar Novo Documento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="identificacao" className="text-soft-black">
                Identificação *
              </Label>
              <Input
                id="identificacao"
                value={formData.identificacao}
                onChange={(e) => setFormData({ ...formData, identificacao: e.target.value })}
                placeholder="Ex: DOC-2024-001"
                className="border-light-gray"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome" className="text-soft-black">
                Nome do Documento *
              </Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome do documento"
                className="border-light-gray"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-soft-black">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição detalhada do documento"
              className="border-light-gray min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-soft-black">
              Setor *
            </Label>
            <Select
                value={formData.setor}
                onValueChange={(value) => setFormData({ ...formData, setor: value })}
                disabled={currentUser?.setor !== "LICITACAO"} // Só Licitação pode alterar
            >
              <SelectTrigger className="border-light-gray">
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(Setor).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-soft-black flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Local Atual *
            </Label>
            <Select value={formData.localAtual} onValueChange={(value) => setFormData({ ...formData, localAtual: value })}>
              <SelectTrigger className="border-light-gray">
                <SelectValue placeholder="Selecione o local atual do documento" />
              </SelectTrigger>
              <SelectContent>
                {locaisEmpresa.map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-soft-black">
              Data de Entrada
            </Label>
            <Input
              value={new Date().toLocaleDateString('pt-BR')}
              readOnly
              className="border-light-gray bg-gray-50"
            />
            <p className="text-xs text-gray-600">
              A data de entrada é preenchida automaticamente
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="anexos" className="text-soft-black flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Anexos
            </Label>
            <Input
              id="anexos"
              type="file"
              multiple
              onChange={(e) => setAnexos(e.target.files)}
              className="border-light-gray"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            <p className="text-xs text-gray-600">
              Formatos aceitos: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="bg-navy-blue hover:bg-navy-blue/90 flex-1">
              <CalendarDays className="h-4 w-4 mr-2" />
              Registrar Documento
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
