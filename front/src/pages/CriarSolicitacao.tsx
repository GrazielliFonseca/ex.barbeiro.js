import { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { medicamentosApi, solicitacoesApi, MedicamentoResponse } from '@/services/api';
import { Loader2 } from 'lucide-react';

const CriarSolicitacao = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingMedicamentos, setLoadingMedicamentos] = useState(true);
  const [medicamentos, setMedicamentos] = useState<MedicamentoResponse[]>([]);
  const [formData, setFormData] = useState({
    nomePaciente: '',
    idadePaciente: '',
    medicamentoId: '',
    descricao: '',
  });

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        setLoadingMedicamentos(true);
        const data = await medicamentosApi.listar();
        setMedicamentos(data);
      } catch (error) {
        console.error('Erro ao carregar medicamentos:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os medicamentos',
          variant: 'destructive',
        });
      } finally {
        setLoadingMedicamentos(false);
      }
    };

    fetchMedicamentos();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não autenticado',
        variant: 'destructive',
      });
      return;
    }

    const medicamento = medicamentos.find(m => m.id === formData.medicamentoId);

    if (!medicamento) {
      toast({
        title: 'Erro',
        description: 'Medicamento não encontrado',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      await solicitacoesApi.criar({
        nomePaciente: formData.nomePaciente,
        idadePaciente: parseInt(formData.idadePaciente, 10),
        medicoId: user.id,
        medicamentoId: formData.medicamentoId,
        descricaoPaciente: formData.descricao,
        status: 'Pendente',
        farmaceuticoId: '',
      });

      toast({
        title: 'Solicitação criada com sucesso!',
        description: 'A solicitação está aguardando aprovação.',
      });

      setFormData({
        nomePaciente: '',
        idadePaciente: '',
        medicamentoId: '',
        descricao: '',
      });
    } catch (error) {
      console.error('Erro ao criar solicitação:', error);
      toast({
        title: 'Erro ao criar solicitação',
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedMedicamento = medicamentos.find(m => m.id === formData.medicamentoId);

  return (
    
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Criar Solicitação</h1>
          </header>
          
          <div className="p-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Nova Solicitação de Medicamento</CardTitle>
                <CardDescription>
                  Preencha os dados do paciente e do medicamento solicitado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nomePaciente">Nome do Paciente</Label>
                      <Input
                        id="nomePaciente"
                        value={formData.nomePaciente}
                        onChange={(e) => setFormData({ ...formData, nomePaciente: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idadePaciente">Idade do Paciente</Label>
                      <Input
                        id="idadePaciente"
                        type="number"
                        min="0"
                        max="150"
                        value={formData.idadePaciente}
                        onChange={(e) => setFormData({ ...formData, idadePaciente: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicamento">Medicamento</Label>
                    {loadingMedicamentos ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : (
                      <Select
                        value={formData.medicamentoId}
                        onValueChange={(value) => setFormData({ ...formData, medicamentoId: value })}
                        required
                        disabled={loading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um medicamento" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicamentos.length === 0 ? (
                            <SelectItem value="none" disabled>
                              Nenhum medicamento cadastrado
                            </SelectItem>
                          ) : (
                            medicamentos.map((med) => (
                              <SelectItem key={med.id} value={med.id}>
                                {med.nomeMedicamento} - Estoque: {med.estoque} un.
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {selectedMedicamento && (
                    <Card className="bg-muted">
                      <CardContent className="pt-4">
                        <p className="text-sm font-medium">Informações do Medicamento:</p>
                        <p className="text-sm text-muted-foreground">{selectedMedicamento.informacoes}</p>
                        <p className="mt-2 text-sm">
                          <span className="font-medium">Estoque disponível:</span> {selectedMedicamento.estoque} unidades
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="nomeMedico">Médico Solicitante</Label>
                    <Input
                      id="nomeMedico"
                      value={user?.nome || ''}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição / Justificativa</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva o motivo da solicitação..."
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      required
                      rows={4}
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading || loadingMedicamentos}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando solicitação...
                      </>
                    ) : (
                      'Criar Solicitação'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    
  );
};

export default CriarSolicitacao;
