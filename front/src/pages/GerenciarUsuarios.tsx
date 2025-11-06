import { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { usuariosApi, UsuarioResponse } from '@/services/api';

const GerenciarUsuarios = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState<'todos' | 'Médico' | 'Farmacêutico'>('todos');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'Médico' as 'Médico' | 'Farmacêutico'
  });

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuariosApi.listar();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os usuários',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const filteredUsuarios = usuarios.filter(user => {
    const matchesSearch =
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipo = filterTipo === 'todos' || user.tipo === filterTipo;

    return matchesSearch && matchesTipo;
  });

  const handleCreateUser = async () => {
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
      toast({
        title: 'Erro',
        description: 'Todos os campos são obrigatórios',
        variant: 'destructive',
      });
      return;
    }

    try {
      setCreating(true);
      await usuariosApi.criar({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        senha: novoUsuario.senha,
        tipo: novoUsuario.tipo,
      });

      toast({
        title: 'Usuário criado',
        description: `${novoUsuario.nome} foi adicionado ao sistema.`,
      });

      setDialogOpen(false);
      setNovoUsuario({ nome: '', email: '', senha: '', tipo: 'Médico' });
      await fetchUsuarios();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast({
        title: 'Erro ao criar usuário',
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const getTipoColor = (tipo: string) => {
    return tipo === 'Médico'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  };

  return (
    
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Gerenciar Usuários</h1>
          </header>
          
          <div className="p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Usuários do Sistema</CardTitle>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar Novo Usuário</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome</Label>
                          <Input
                            id="nome"
                            placeholder="Digite o nome completo"
                            value={novoUsuario.nome}
                            onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@hospital.com"
                            value={novoUsuario.email}
                            onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="senha">Senha</Label>
                          <Input
                            id="senha"
                            type="password"
                            placeholder="Digite a senha"
                            value={novoUsuario.senha}
                            onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tipo">Tipo</Label>
                          <Select
                            value={novoUsuario.tipo}
                            onValueChange={(value) => setNovoUsuario({ ...novoUsuario, tipo: value as 'Médico' | 'Farmacêutico' })}
                            disabled={creating}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Médico">Médico</SelectItem>
                              <SelectItem value="Farmacêutico">Farmacêutico</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleCreateUser} className="w-full" disabled={creating}>
                          {creating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Criando...
                            </>
                          ) : (
                            'Criar Usuário'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={filterTipo}
                    onValueChange={(value) => setFilterTipo(value as 'todos' | UserRole)}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Médico">Médicos</SelectItem>
                      <SelectItem value="Farmacêutico">Farmacêuticos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredUsuarios.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {searchTerm || filterTipo !== 'todos'
                        ? 'Nenhum usuário encontrado com os filtros aplicados'
                        : 'Nenhum usuário cadastrado'}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Permissões</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsuarios.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.nome}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getTipoColor(user.tipo)}>
                              {user.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {user.tipo === 'Farmacêutico' ? (
                              <span>Acesso total ao sistema</span>
                            ) : (
                              <span>Criar solicitações, ver medicamentos</span>
                            )}
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

export default GerenciarUsuarios;
