import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { getAllMedicamentos, type Medicamento } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Estoque = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Estoque;
