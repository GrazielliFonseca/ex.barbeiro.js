// src/pages/HelpDesk.tsx

import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Para feedback ao usuário
import { HelpCircle } from "lucide-react";

// Tipos básicos para o formulário
type IssueType =
  | "login"
  | "dashboard"
  | "medicamentos"
  | "solicitacoes"
  | "outro";

const HelpDesk = () => {
  const [issueType, setIssueType] = useState<IssueType>("login");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio para a API
    setTimeout(() => {
      console.log("Ticket Enviado:", { issueType, description });

      // Simula o sucesso após o envio
      toast({
        title: "Ticket de Suporte Enviado!",
        description: `Seu problema (${issueType}) foi registrado. Entraremos em contato em breve.`,
      });

      // Resetar o formulário
      setIssueType("login");
      setDescription("");
      setIsSubmitting(false);
    }, 1500); // 1.5 segundo de delay simulando requisição
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <HelpCircle className="h-5 w-5" /> HelpDesk - Suporte
            </h1>
          </header>

          <div className="p-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Abrir Novo Ticket de Suporte</CardTitle>
                <CardDescription>
                  Selecione a área do problema e descreva o que está
                  acontecendo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Área do Problema</Label>
                    <Select
                      value={issueType}
                      onValueChange={(value) =>
                        setIssueType(value as IssueType)
                      }
                      required
                    >
                      <SelectTrigger id="issueType">
                        <SelectValue placeholder="Selecione a área afetada" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="login">
                          Problemas de Login / Acesso
                        </SelectItem>
                        <SelectItem value="dashboard">
                          Dashboard / Visão Geral
                        </SelectItem>
                        <SelectItem value="medicamentos">
                          Gestão de Medicamentos / Estoque
                        </SelectItem>
                        <SelectItem value="solicitacoes">
                          Criação / Aprovação de Solicitações
                        </SelectItem>
                        <SelectItem value="outro">
                          Outro (Descreva abaixo)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Descrição Detalhada do Problema
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Ex: Não consigo aprovar solicitações, o botão está desativado."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default HelpDesk;
