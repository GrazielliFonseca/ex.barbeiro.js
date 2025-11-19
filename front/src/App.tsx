import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicamentos from "./pages/Medicamentos";
import HelpDesk from "./pages/Helpdesk";
import Estoque from "./pages/Estoque";
import CriarSolicitacao from "./pages/CriarSolicitacao";
import MinhasSolicitacoes from "./pages/MinhasSolicitacoes";
import GerenciarSolicitacoes from "./pages/GerenciarSolicitacoes";
import CadastrarMedicamento from "./pages/CadastrarMedicamento";
import GerenciarUsuarios from "./pages/GerenciarUsuarios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <SidebarProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/medicamentos"
                element={
                  <ProtectedRoute>
                    <Medicamentos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/estoque"
                element={
                  <ProtectedRoute>
                    <Estoque />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/criar-solicitacao"
                element={
                  <ProtectedRoute>
                    <CriarSolicitacao />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/minhas-solicitacoes"
                element={
                  <ProtectedRoute>
                    <MinhasSolicitacoes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gerenciar-solicitacoes"
                element={
                  <ProtectedRoute>
                    <GerenciarSolicitacoes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cadastrar-medicamento"
                element={
                  <ProtectedRoute>
                    <CadastrarMedicamento />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gerenciar-usuarios"
                element={
                  <ProtectedRoute>
                    <GerenciarUsuarios />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/helpdesk"
                element={
                  <ProtectedRoute>
                    <HelpDesk />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
