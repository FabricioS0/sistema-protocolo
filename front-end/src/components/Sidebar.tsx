
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Documentos",
    icon: FileText,
    path: "/documentos",
  },
  {
    title: "Histórico",
    icon: History,
    path: "/historico",
  },
  {
    title: "Administração",
    icon: Settings,
    path: "/administracao",
  },
];

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-navy-blue text-white transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4 border-b border-white/10">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white hover:bg-white/10 ml-auto block"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-colors",
                    "hover:bg-white/10",
                    isActive && "bg-white/20",
                    !isOpen && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
