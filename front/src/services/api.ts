// Configuração da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://grupo02projeto.escolatecnicaadelia.info/api';

// Tipos de resposta da API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ==================== USUÁRIOS ====================

export interface UsuarioResponse {
  id: string;
  nome: string;
  tipo: string;
  email: string;
}

export interface LoginResponse {
  mensagem: string;
  usuario: UsuarioResponse;
}

export interface CreateUsuarioRequest {
  nome: string;
  tipo: 'Médico' | 'Farmacêutico';
  senha: string;
  email: string;
}

export const usuariosApi = {
  // Listar todos os usuários
  listar: async (): Promise<UsuarioResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/usuarios`);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    return response.json();
  },

  // Criar novo usuário
  criar: async (data: CreateUsuarioRequest): Promise<UsuarioResponse> => {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar usuário');
    }

    return response.json();
  },

  // Login
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Credenciais inválidas');
    }

    return response.json();
  },

  // Buscar por tipo
  buscarPorTipo: async (tipo: string): Promise<UsuarioResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/usuarios/tipo/${tipo}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar usuários por tipo');
    }

    return response.json();
  },

  // Buscar por nome ou email
  buscar: async (params: { nome?: string; email?: string }): Promise<UsuarioResponse> => {
    const queryParams = new URLSearchParams();
    if (params.nome) queryParams.append('nome', params.nome);
    if (params.email) queryParams.append('email', params.email);

    const response = await fetch(`${API_BASE_URL}/usuarios/buscar?${queryParams.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Usuário não encontrado');
    }

    return response.json();
  },
};

// ==================== MEDICAMENTOS ====================

export interface MedicamentoResponse {
  id: string;
  nomeMedicamento: string;
  estoque: number;
  informacoes: string;
  statusEstoque?: 'Baixo' | 'Normal' | 'Crítico' | 'Esgotado';
}

export interface CreateMedicamentoRequest {
  nomeMedicamento: string;
  estoque: number;
  informacoes: string;
}

export interface BaixaEstoqueRequest {
  quantidade: number;
}

export const medicamentosApi = {
  // Listar todos os medicamentos
  listar: async (): Promise<MedicamentoResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/medicamentos`);

    if (!response.ok) {
      throw new Error('Erro ao buscar medicamentos');
    }

    return response.json();
  },

  // Criar novo medicamento
  criar: async (data: CreateMedicamentoRequest): Promise<MedicamentoResponse> => {
    const response = await fetch(`${API_BASE_URL}/medicamentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar medicamento');
    }

    return response.json();
  },

  // Buscar medicamento por ID
  buscarPorId: async (id: string): Promise<MedicamentoResponse> => {
    const response = await fetch(`${API_BASE_URL}/medicamentos/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Medicamento não encontrado');
    }

    return response.json();
  },

  // Dar baixa no estoque
  darBaixa: async (id: string, quantidade: number): Promise<{ message: string; estoqueAtual: number }> => {
    const response = await fetch(`${API_BASE_URL}/medicamentos/${id}/baixa`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantidade }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao dar baixa no estoque');
    }

    return response.json();
  },

  // Buscar medicamentos por status de estoque
  buscarPorStatus: async (status: 'Crítico' | 'Baixo' | 'Normal' | 'Esgotado'): Promise<MedicamentoResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/medicamentos/status?status=${status}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar medicamentos por status');
    }

    return response.json();
  },
};

// ==================== SOLICITAÇÕES ====================

export interface SolicitacaoResponse {
  id: string;
  nomePaciente: string;
  idadePaciente: number;
  medicoId: string;
  medicamentoId: string;
  descricaoPaciente: string;
  data?: Date;
  status: 'Pendente' | 'Aprovada' | 'Rejeitada';
  farmaceuticoId: string;
}

export interface CreateSolicitacaoRequest {
  nomePaciente: string;
  idadePaciente: number;
  medicoId: string;
  medicamentoId: string;
  descricaoPaciente: string;
  status: 'Pendente' | 'Aprovada' | 'Rejeitada';
  farmaceuticoId: string;
}

export interface UpdateStatusRequest {
  novoStatus: 'Pendente' | 'Aprovada' | 'Rejeitada';
  farmaceuticoId: string;
}

export const solicitacoesApi = {
  // Listar todas as solicitações
  listar: async (): Promise<SolicitacaoResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/solicitacoes`);

    if (!response.ok) {
      throw new Error('Erro ao buscar solicitações');
    }

    return response.json();
  },

  // Criar nova solicitação
  criar: async (data: CreateSolicitacaoRequest): Promise<SolicitacaoResponse> => {
    const response = await fetch(`${API_BASE_URL}/solicitacoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar solicitação');
    }

    return response.json();
  },

  // Buscar solicitações pendentes
  buscarPendentes: async (): Promise<SolicitacaoResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/solicitacoes/pendentes`);

    if (!response.ok) {
      throw new Error('Erro ao buscar solicitações pendentes');
    }

    return response.json();
  },

  // Buscar solicitações por paciente
  buscarPorPaciente: async (nomePaciente: string): Promise<SolicitacaoResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/solicitacoes/paciente/${encodeURIComponent(nomePaciente)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar solicitações do paciente');
    }

    return response.json();
  },

  // Atualizar status da solicitação
  atualizarStatus: async (id: string, data: UpdateStatusRequest): Promise<SolicitacaoResponse> => {
    const response = await fetch(`${API_BASE_URL}/solicitacoes/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao atualizar status da solicitação');
    }

    return response.json();
  },
};

// ==================== FUNÇÕES DE COMPATIBILIDADE (para manter o Dashboard funcionando) ====================

export interface Medicamento {
  id: string;
  nome: string;
  quantidadeEstoque: number;
  estoqueStatus: 'normal' | 'critico' | 'esgotado' | 'baixo';
}

export interface Solicitacao {
  id: string;
  medicamentoNome: string;
  nomePaciente: string;
  dataCriacao: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
}

// Função de compatibilidade para mapear os dados da API para o formato do Dashboard
const mapMedicamentoStatus = (status?: string): 'normal' | 'critico' | 'esgotado' | 'baixo' => {
  if (!status) return 'normal';
  const statusLower = status.toLowerCase();
  if (statusLower === 'crítico') return 'critico';
  if (statusLower === 'esgotado') return 'esgotado';
  if (statusLower === 'baixo') return 'baixo';
  return 'normal';
};

const mapSolicitacaoStatus = (status: string): 'pendente' | 'aprovada' | 'rejeitada' => {
  const statusLower = status.toLowerCase();
  if (statusLower === 'aprovada') return 'aprovada';
  if (statusLower === 'rejeitada') return 'rejeitada';
  return 'pendente';
};

// Função que o Dashboard usa - agora integrada com a API real
export const getDashboardData = async (): Promise<{
  medicamentos: Medicamento[];
  solicitacoes: Solicitacao[];
}> => {
  try {
    const [medicamentosData, solicitacoesData] = await Promise.all([
      medicamentosApi.listar(),
      solicitacoesApi.listar(),
    ]);

    // Buscar informações dos medicamentos para as solicitações
    const medicamentosMap = new Map(medicamentosData.map(m => [m.id, m]));

    const medicamentos: Medicamento[] = medicamentosData.map(med => ({
      id: med.id,
      nome: med.nomeMedicamento,
      quantidadeEstoque: med.estoque,
      estoqueStatus: mapMedicamentoStatus(med.statusEstoque),
    }));

    const solicitacoes: Solicitacao[] = solicitacoesData.map(sol => ({
      id: sol.id,
      medicamentoNome: medicamentosMap.get(sol.medicamentoId)?.nomeMedicamento || 'Medicamento não encontrado',
      nomePaciente: sol.nomePaciente,
      dataCriacao: sol.data ? new Date(sol.data).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      status: mapSolicitacaoStatus(sol.status),
    }));

    return {
      medicamentos,
      solicitacoes,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    throw error;
  }
};

// Função compatível com páginas existentes
export const getAllMedicamentos = async (): Promise<Medicamento[]> => {
  try {
    const medicamentosData = await medicamentosApi.listar();
    return medicamentosData.map(med => ({
      id: med.id,
      nome: med.nomeMedicamento,
      quantidadeEstoque: med.estoque,
      estoqueStatus: mapMedicamentoStatus(med.statusEstoque),
    }));
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    throw error;
  }
};

// Exportação padrão com todas as APIs
export default {
  usuarios: usuariosApi,
  medicamentos: medicamentosApi,
  solicitacoes: solicitacoesApi,
};