
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  currentUser: any;
  onLogout: () => void;
}

export const Layout = ({ currentUser, onLogout }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-light-gray">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onLogout={onLogout}
          currentUser={currentUser}
        />
        
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};
