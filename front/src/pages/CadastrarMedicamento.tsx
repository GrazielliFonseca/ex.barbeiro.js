import { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { medicamentosApi } from '@/services/api';
import { Loader2 } from 'lucide-react';

const CadastrarMedicamento = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    informacoes: '',
    estoque: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await medicamentosApi.criar({
        nomeMedicamento: formData.nome,
        informacoes: formData.informacoes,
        estoque: parseInt(formData.estoque, 10),
      });

      toast({
        title: 'Medicamento cadastrado com sucesso!',
        description: `${formData.nome} foi adicionado ao sistema.`,
      });

      setFormData({
        nome: '',
        informacoes: '',
        estoque: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar medicamento:', error);
      toast({
        title: 'Erro ao cadastrar medicamento',
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Cadastrar Medicamento</h1>
          </header>
          
          <div className="p-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Novo Medicamento</CardTitle>
                <CardDescription>
                  Adicione um novo medicamento ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Medicamento</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: Paracetamol 500mg"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="informacoes">Informações do Medicamento</Label>
                    <Textarea
                      id="informacoes"
                      placeholder="Indicações, posologia, contraindicações, descrição..."
                      value={formData.informacoes}
                      onChange={(e) => setFormData({ ...formData, informacoes: e.target.value })}
                      required
                      rows={4}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estoque">Quantidade em Estoque</Label>
                    <Input
                      id="estoque"
                      type="number"
                      min="0"
                      placeholder="Ex: 100"
                      value={formData.estoque}
                      onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Cadastrando...
                      </>
                    ) : (
                      'Cadastrar Medicamento'
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

export default CadastrarMedicamento;
