import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Info } from 'lucide-react';
import { getAllMedicamentos, medicamentosApi, type Medicamento } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Estoque = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [medicamentoInfo, setMedicamentoInfo] = useState<Medicamento | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        setLoading(true);
        const data = await getAllMedicamentos();
        setMedicamentos(data);
      } catch (error) {
        console.error('Erro ao carregar medicamentos:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar o estoque',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicamentos();
  }, [toast]);

  const getEstoqueColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'baixo': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'critico': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'esgotado': return 'bg-destructive text-destructive-foreground';
      default: return '';
    }
  };

  const getEstoqueLabel = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'baixo': return 'Baixo';
      case 'critico': return 'Crítico';
      case 'esgotado': return 'Esgotado';
      default: return status;
    }
  };

  const handleAdicionarEstoque = async () => {
    if (!selectedMedicamento || quantidade <= 0) {
      toast({
        title: 'Erro',
        description: 'Quantidade inválida',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      await medicamentosApi.adicionarEstoque(selectedMedicamento.id, quantidade);

      toast({
        title: 'Sucesso',
        description: `${quantidade} unidades adicionadas ao estoque de ${selectedMedicamento.nome}`,
      });

      // Recarregar medicamentos
      const data = await getAllMedicamentos();
      setMedicamentos(data);

      setDialogOpen(false);
      setQuantidade(0);
      setSelectedMedicamento(null);
    } catch (error) {
      console.error('Erro ao adicionar estoque:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Não foi possível adicionar ao estoque',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Controle de Estoque</h1>
        </header>

        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Estoque de Medicamentos</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : medicamentos.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum medicamento cadastrado no estoque.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicamento</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicamentos.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell>
                          <p className="font-medium">{med.nome}</p>
                        </TableCell>
                        <TableCell>
                          <span className="text-lg font-semibold">{med.quantidadeEstoque}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getEstoqueColor(med.estoqueStatus)}>
                            {getEstoqueLabel(med.estoqueStatus)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setMedicamentoInfo(med);
                                setInfoDialogOpen(true);
                              }}
                            >
                              <Info className="mr-2 h-4 w-4" />
                              Informações
                            </Button>
                            <Dialog open={dialogOpen && selectedMedicamento?.id === med.id} onOpenChange={(open) => {
                              setDialogOpen(open);
                              if (!open) {
                                setSelectedMedicamento(null);
                                setQuantidade(0);
                              }
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedMedicamento(med);
                                    setDialogOpen(true);
                                  }}
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Adicionar
                                </Button>
                              </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Adicionar ao Estoque</DialogTitle>
                                <DialogDescription>
                                  Adicione mais unidades de {med.nome} ao estoque.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="quantidade" className="text-right">
                                    Quantidade
                                  </Label>
                                  <Input
                                    id="quantidade"
                                    type="number"
                                    min="1"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Estoque atual</Label>
                                  <div className="col-span-3 font-semibold">{med.quantidadeEstoque}</div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setDialogOpen(false);
                                    setQuantidade(0);
                                    setSelectedMedicamento(null);
                                  }}
                                  disabled={submitting}
                                >
                                  Cancelar
                                </Button>
                                <Button
                                  type="submit"
                                  onClick={handleAdicionarEstoque}
                                  disabled={submitting || quantidade <= 0}
                                >
                                  {submitting ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Adicionando...
                                    </>
                                  ) : (
                                    'Adicionar'
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Modal de Informações do Medicamento */}
          <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Informações do Medicamento</DialogTitle>
                <DialogDescription>
                  Detalhes completos sobre o medicamento
                </DialogDescription>
              </DialogHeader>
              {medicamentoInfo && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right font-semibold pt-2">Nome:</Label>
                    <div className="col-span-3 pt-2">{medicamentoInfo.nome}</div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right font-semibold pt-2">Quantidade em Estoque:</Label>
                    <div className="col-span-3 pt-2">
                      <span className="text-lg font-semibold">{medicamentoInfo.quantidadeEstoque}</span> unidades
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right font-semibold pt-2">Status:</Label>
                    <div className="col-span-3 pt-2">
                      <Badge className={getEstoqueColor(medicamentoInfo.estoqueStatus)}>
                        {getEstoqueLabel(medicamentoInfo.estoqueStatus)}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right font-semibold pt-2">Informações:</Label>
                    <div className="col-span-3 whitespace-pre-wrap bg-muted p-4 rounded-md">
                      {medicamentoInfo.informacoes || 'Nenhuma informação adicional disponível.'}
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setInfoDialogOpen(false);
                    setMedicamentoInfo(null);
                  }}
                >
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Estoque;
