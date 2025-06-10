
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Edit, User } from "lucide-react";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: any;
  onStatusChange: (documentId: string, newStatus: string, observacao: string) => void;
}

export const StatusModal = ({ isOpen, onClose, document, onStatusChange }: StatusModalProps) => {
  const { toast } = useToast();
  const [newStatus, setNewStatus] = useState("");
  const [observacao, setObservacao] = useState("");

  const statusOptions = [
    { id: "1", status: "Pendente", color: "bg-yellow-100 text-yellow-800" },
    { id: "2", status: "Em Revisão", color: "bg-blue-100 text-blue-800" },
    { id: "3", status: "Aprovado", color: "bg-green-100 text-green-800" },
    { id: "4", status: "Rejeitado", color: "bg-red-100 text-red-800" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStatus) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um novo status.",
        variant: "destructive",
      });
      return;
    }

    onStatusChange(document?.id, newStatus, observacao);
    
    toast({
      title: "Sucesso",
      description: "Status do documento atualizado com sucesso!",
    });
    
    setNewStatus("");
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
            Alterar Status do Documento
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-light-gray p-4 rounded-lg">
            <h3 className="font-medium text-soft-black mb-2">Documento Selecionado</h3>
            <p className="text-sm text-gray-700">
              <strong>Nome:</strong> {document.nome}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Status Atual:</strong> {document.status}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-soft-black flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Novo Status *
              </Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="border-light-gray">
                  <SelectValue placeholder="Selecione o novo status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                          {status.status}
                        </span>
                      </div>
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
                placeholder="Adicione uma observação sobre a mudança de status (opcional)"
                className="border-light-gray min-h-[100px]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-navy-blue hover:bg-navy-blue/90 flex-1">
                Atualizar Status
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
