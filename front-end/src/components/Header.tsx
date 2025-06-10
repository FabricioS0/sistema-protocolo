
import { LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
  currentUser?: any;
}

export const Header = ({ onToggleSidebar, onLogout, currentUser }: HeaderProps) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="bg-navy-blue text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-white hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-navy-blue font-bold text-sm">DOC</span>
          </div>
          <h1 className="text-xl font-semibold">Sistema de Documentação</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right mr-3">
          <div className="text-sm font-medium">{currentUser?.nome || "Usuário"}</div>
          <div className="text-xs text-white/70">{currentUser?.setor || "Setor"}</div>
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <User className="h-4 w-4 mr-2" />
          {currentUser?.cargo || "Usuário"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  );
};
