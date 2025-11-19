import {
  LayoutDashboard,
  Pill,
  Package,
  FileText,
  ClipboardList,
  PlusCircle,
  Users,
  ShieldQuestionIcon,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Medicamentos", url: "/medicamentos", icon: Pill },
    { title: "Estoque", url: "/estoque", icon: Package },
    { title: "Criar Solicitação", url: "/criar-solicitacao", icon: FileText },
    {
      title: "Minhas Solicitações",
      url: "/minhas-solicitacoes",
      icon: ClipboardList,
    },
    {
      title: "Gerenciar Solicitações",
      url: "/gerenciar-solicitacoes",
      icon: ClipboardList,
    },
    {
      title: "Cadastrar Medicamento",
      url: "/cadastrar-medicamento",
      icon: PlusCircle,
    },
    { title: "Gerenciar Usuários", url: "/gerenciar-usuarios", icon: Users },
    { title: "Suporte", url: "/helpdesk", icon: ShieldQuestionIcon },
  ];

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-sidebar-primary">
              WikiFarma
            </h2>
            <p className="text-xs text-muted-foreground">
              Gerenciamento de Medicamentos
            </p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!collapsed && user && (
          <div className="mb-2">
            <p className="text-sm font-medium text-sidebar-foreground">
              {user.nome}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user.tipo}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={handleLogout}
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
