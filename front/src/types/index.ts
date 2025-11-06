// Tipos de usuário compatíveis com a API
export type UserRole = 'Médico' | 'Farmacêutico';

export interface User {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  tipo: UserRole;
}

// Status de solicitação da API
export type SolicitacaoStatus = 'Pendente' | 'Aprovada' | 'Rejeitada';

// Interface de solicitação compatível com a API
export interface Solicitacao {
  id: string;
  nomePaciente: string;
  idadePaciente: number;
  medicamentoId: string;
  medicamentoNome?: string;
  medicoId: string;
  nomeMedico?: string;
  descricaoPaciente: string;
  status: SolicitacaoStatus;
  data?: Date;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
  farmaceuticoId: string;
}

// Status de estoque compatível com a API
export type EstoqueStatus = 'Normal' | 'Baixo' | 'Crítico' | 'Esgotado';

// Interface de medicamento compatível com a API
export interface Medicamento {
  id: string;
  nome: string;
  nomeMedicamento?: string;
  informacoes: string;
  informacoesClinicas?: string;
  quantidadeEstoque: number;
  estoque?: number;
  estoqueStatus: EstoqueStatus;
  estoqueMinimo?: number;
}
