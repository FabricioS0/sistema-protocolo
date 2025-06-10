
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Edit, User } from "lucide-react";
import { Setor } from "@/types/enums";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
  onLocationChange: (documentId: string, newLocation: string, observacao: string) => void;
}

export const LocationModal = ({ isOpen, onClose, document, onLocationChange }: LocationModalProps) => {
  const { toast } = useToast();
  const [newLocation, setNewLocation] = useState("");
  const [observacao, setObservacao] = useState("");

  // Usar os setores da empresa como locais
  const locaisEmpresa = Object.entries(Setor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newLocation) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um novo local.",
        variant: "destructive",
      });
      return;
    }

    onLocationChange(document?.id, newLocation, observacao);

    toast({
      title: "Sucesso",
      description: "Local do documento atualizado com sucesso!",
    });

    setNewLocation("");
    setObservacao("");
    onClose();
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-navy-blue flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Alterar Local do Documento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-light-gray p-4 rounded-lg">
            <h3 className="font-medium text-soft-black mb-2">Documento Selecionado</h3>
            <p className="text-sm text-gray-700">
              <strong>Nome:</strong> {document.nome}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Local Atual:</strong> {document.local_atual}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-soft-black flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Novo Local *
              </Label>
              <Select value={newLocation} onValueChange={setNewLocation}>
                <SelectTrigger className="border-light-gray">
                  <SelectValue placeholder="Selecione o novo local" />
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
              <Label htmlFor="observacao" className="text-soft-black flex items-center gap-2">
                <User className="h-4 w-4" />
                Observação
              </Label>
              <Textarea
                id="observacao"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                placeholder="Adicione uma observação sobre a mudança de local (opcional)"
                className="border-light-gray min-h-[100px]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-navy-blue hover:bg-navy-blue/90 flex-1">
                Atualizar Local
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="border-navy-blue text-navy-blue">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
