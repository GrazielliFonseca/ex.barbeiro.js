import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { getDashboardData, type Medicamento, type Solicitacao } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData();
        setMedicamentos(data.medicamentos);
        setSolicitacoes(data.solicitacoes);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do dashboard',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const estoquesCriticos = medicamentos.filter(m => m.estoqueStatus === 'critico' || m.estoqueStatus === 'esgotado');
  const solicitacoesPendentes = solicitacoes.filter(s => s.status === 'pendente');
  const solicitacoesAprovadas = solicitacoes.filter(s => s.status === 'aprovada');

  const stats = [
    {
      title: 'Total de Medicamentos',
      value: medicamentos.length,
      icon: Package,
      color: 'text-primary',
    },
    {
      title: 'Estoques Críticos',
      value: estoquesCriticos.length,
      icon: AlertTriangle,
      color: 'text-destructive',
    },
    {
      title: 'Solicitações Pendentes',
      value: solicitacoesPendentes.length,
      icon: FileText,
      color: 'text-yellow-600',
    },
    {
      title: 'Solicitações Aprovadas',
      value: solicitacoesAprovadas.length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>
          <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Alertas de Estoque</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {estoquesCriticos.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhum alerta no momento</p>
                  ) : (
                    estoquesCriticos.map((med) => (
                      <div key={med.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{med.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            Estoque: {med.quantidadeEstoque} unidades
                          </p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          med.estoqueStatus === 'esgotado'
                            ? 'bg-destructive text-destructive-foreground'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {med.estoqueStatus === 'esgotado' ? 'Esgotado' : 'Crítico'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solicitações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {solicitacoes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma solicitação cadastrada</p>
                  ) : (
                    solicitacoes.slice(0, 3).map((sol) => (
                      <div key={sol.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{sol.nomePaciente}</p>
                          <p className="text-sm text-muted-foreground">{sol.medicamentoNome}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          sol.status === 'aprovada'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : sol.status === 'pendente'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-destructive text-destructive-foreground'
                        }`}>
                          {sol.status === 'aprovada' ? 'Aprovada' : sol.status === 'pendente' ? 'Pendente' : 'Rejeitada'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
