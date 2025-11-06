import { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { solicitacoesApi, medicamentosApi, usuariosApi, SolicitacaoResponse, MedicamentoResponse, UsuarioResponse } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface SolicitacaoExtended extends SolicitacaoResponse {
  medicamentoNome: string;
  nomeMedico: string;
}

const GerenciarSolicitacoes = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSolicitacoes = async () => {
    try {
      setLoading(true);
      const [solicitacoesData, medicamentosData, usuariosData] = await Promise.all([
        solicitacoesApi.listar(),
        medicamentosApi.listar(),
        usuariosApi.listar(),
      ]);

      const medicamentosMap = new Map<string, MedicamentoResponse>(
        medicamentosData.map(m => [m.id, m])
      );
      const usuariosMap = new Map<string, UsuarioResponse>(
        usuariosData.map(u => [u.id, u])
      );

      const solicitacoesExtended: SolicitacaoExtended[] = solicitacoesData.map(sol => ({
        ...sol,
        medicamentoNome: medicamentosMap.get(sol.medicamentoId)?.nomeMedicamento || 'Medicamento não encontrado',
        nomeMedico: usuariosMap.get(sol.medicoId)?.nome || 'Médico não encontrado',
      }));

      setSolicitacoes(solicitacoesExtended);
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

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const handleAprovar = async (id: string) => {
    if (!user?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não autenticado',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUpdatingId(id);
      await solicitacoesApi.atualizarStatus(id, {
        novoStatus: 'Aprovada',
        farmaceuticoId: user.id,
      });

      toast({
        title: 'Solicitação aprovada',
        description: 'O medicamento será dispensado.',
      });

      await fetchSolicitacoes();
    } catch (error) {
      console.error('Erro ao aprovar solicitação:', error);
      toast({
        title: 'Erro ao aprovar solicitação',
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRejeitar = async (id: string) => {
    if (!user?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não autenticado',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUpdatingId(id);
      await solicitacoesApi.atualizarStatus(id, {
        novoStatus: 'Rejeitada',
        farmaceuticoId: user.id,
      });

      toast({
        title: 'Solicitação rejeitada',
        description: 'A solicitação foi recusada.',
        variant: 'destructive',
      });

      await fetchSolicitacoes();
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast({
        title: 'Erro ao rejeitar solicitação',
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setUpdatingId(null);
    }
  };

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
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Gerenciar Solicitações</h1>
          </header>
          
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Solicitações de Medicamentos</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : solicitacoes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhuma solicitação encontrada</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Medicamento</TableHead>
                          <TableHead>Médico</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
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
                              <div>
                                <p className="font-medium">{sol.medicamentoNome}</p>
                                <p className="text-sm text-muted-foreground">{sol.descricaoPaciente}</p>
                              </div>
                            </TableCell>
                            <TableCell>{sol.nomeMedico}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(sol.status)}>
                                {getStatusLabel(sol.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {sol.status.toLowerCase() === 'pendente' && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAprovar(sol.id)}
                                    disabled={updatingId === sol.id}
                                    className="text-green-600 hover:bg-green-50 hover:text-green-700"
                                  >
                                    {updatingId === sol.id ? (
                                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                                    ) : (
                                      <CheckCircle className="mr-1 h-4 w-4" />
                                    )}
                                    Aprovar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejeitar(sol.id)}
                                    disabled={updatingId === sol.id}
                                    className="text-destructive hover:bg-destructive/10"
                                  >
                                    {updatingId === sol.id ? (
                                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                                    ) : (
                                      <XCircle className="mr-1 h-4 w-4" />
                                    )}
                                    Rejeitar
                                  </Button>
                                </div>
                              )}
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

export default GerenciarSolicitacoes;
