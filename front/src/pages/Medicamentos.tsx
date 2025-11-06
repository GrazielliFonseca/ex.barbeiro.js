import { useEffect, useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2 } from 'lucide-react';
import { getAllMedicamentos, type Medicamento } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
          description: 'Não foi possível carregar os medicamentos',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicamentos();
  }, [toast]);

  const filteredMedicamentos = medicamentos.filter(med =>
    med.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-xl font-semibold">Medicamentos</h1>
        </header>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredMedicamentos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum medicamento encontrado' : 'Nenhum medicamento cadastrado'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMedicamentos.map((med) => (
                <Card key={med.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{med.nome}</CardTitle>
                      </div>
                      <Badge className={getEstoqueColor(med.estoqueStatus)}>
                        {getEstoqueLabel(med.estoqueStatus)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                        <span className="text-sm font-medium">Estoque:</span>
                        <span className="text-lg font-bold">{med.quantidadeEstoque} un.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Medicamentos;
