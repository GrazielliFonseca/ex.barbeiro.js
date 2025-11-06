import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { solicitacoesApi, medicamentosApi, type SolicitacaoResponse, type MedicamentoResponse } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface SolicitacaoComMedicamento extends SolicitacaoResponse {
  medicamentoNome?: string;
}

const MinhasSolicitacoes = () => {
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoComMedicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        setLoading(true);
        const [todasSolicitacoes, medicamentos] = await Promise.all([
          solicitacoesApi.listar(),
          medicamentosApi.listar(),
        ]);

        // Criar mapa de medicamentos para busca rápida
        const medicamentosMap = new Map<string, MedicamentoResponse>(
          medicamentos.map(med => [med.id, med])
        );

        // Filtrar solicitações do médico atual e adicionar nome do medicamento
        const minhasSolicitacoes = todasSolicitacoes
          .filter(sol => sol.medicoId === user?.id)
          .map(sol => ({
            ...sol,
            medicamentoNome: medicamentosMap.get(sol.medicamentoId)?.nomeMedicamento || 'Não identificado',
          }));

        setSolicitacoes(minhasSolicitacoes);
      } catch (error) {
        console.error('Erro ao carregar solicitações:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as solicitações',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchSolicitacoes();
    }
  }, [user?.id, toast]);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'aprovada': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pendente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejeitada': return 'bg-destructive text-destructive-foreground';
      default: return '';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'aprovada': return 'Aprovada';
      case 'pendente': return 'Pendente';
      case 'rejeitada': return 'Rejeitada';
      default: return status;
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Minhas Solicitações</h1>
        </header>

        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações Criadas por Mim</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : solicitacoes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Você ainda não criou nenhuma solicitação.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Medicamento</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {solicitacoes.map((sol) => (
                        <TableRow key={sol.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{sol.nomePaciente}</p>
                              <p className="text-sm text-muted-foreground">{sol.idadePaciente} anos</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">{sol.medicamentoNome}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-muted-foreground max-w-xs truncate">
                              {sol.descricaoPaciente}
                            </p>
                          </TableCell>
                          <TableCell>
                            {sol.data
                              ? new Date(sol.data).toLocaleDateString('pt-BR')
                              : 'Data não disponível'}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(sol.status)}>
                              {getStatusLabel(sol.status)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MinhasSolicitacoes;
