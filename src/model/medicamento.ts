export class Medicamento {
  constructor(
    private nomeMedicamento: string,
        private principioAtivo: string,
        private concentracao: string,
        private formaFarmaceutica: string,
        private indicacoesUso: string,
        private efeitosAdversos: string,
        private dosagemPadrao: string,
        private interacoesMedicamentosas: string,
        private codigoEstoque: string,
        private quantidadeDisponivel: number,
        private localizacaoFisica: string,
        private dataValidadeLote: Date,
        private fabricante: string,
        private formadeAdministraçao: string,
        private medicamentoControlado: boolean,
        private requerRefrigeração: boolean,
        private medicamentoGenérico: boolean,
        private posologia: string,
        private precoUnitario: number,
        private estoqueMinimo: number,
        private estoqueMaximo: number,
        private localizaçao: string,
        private lote: string,
        private observaçoes: string

  ){
    if (nomeMedicamento) throw new Error('Nome obrigatório..');
    if (principioAtivo) throw new Error ('Principio Ativo Obrigatório.');
    if (concentracao) throw new Error('Concentração Obrigatório.');
    if (formaFarmaceutica)  throw new Error('Forma Farmaceutica Obrigatória.')
    if (indicacoesUso) throw new Error('Indicações Obrigatórias.') 
    if (efeitosAdversos) throw new Error('Efeitos Adversos Obrigatórios.')
    if (dosagemPadrao) throw new Error('Dosagem Padrão Obrigatória.')
    if (interacoesMedicamentosas) throw new Error('O campo "interacoesMedicamentosas" não pode ser vazio.')
    if (codigoEstoque) throw new Error('Codigo do Estoque Obrigatório.')
    if (quantidadeDisponivel) throw new Error('Quantidade Disponível Obrigatória.')
    if (localizacaoFisica) throw new Error('Localização Inválida.')
    if (dataValidadeLote) throw new Error('Data de Validade inválida.')
    if (fabricante) throw new Error('Fabricante Obrigatório.')
    if (medicamentoControlado) throw new Error('Medicamento Controlado Obrigatório.')
    if (requerRefrigeração) throw new Error('Refrigeração Obrigatória.')
    if (medicamentoControlado) throw new Error('Medicamento Controlado Obrigatório.')
    if (medicamentoGenérico) throw new Error('Medicamento Genérico Obrigatório.')
    if (posologia) throw new Error('Posologia Obrigatória.')
    if (precoUnitario) throw new Error('Preço Unitário Obrigatório.')
    if (estoque)
    
    if (nome.length < 3) throw new Error('Nome muito curto.');
    if (preco <= 0) throw new Error('preco deve ser maior que 0.');
    if (tempoEstimado <= 0) throw new Error('tempoEstimado deve ser maior que 0');
  }

static create(nome: string, preco: number, tempoEstimado: number){
    const id = crypto.randomUUID();
    return new Servico(id, nome, preco, tempoEstimado);
}

getId(): string {
    return this.id;
}

getNome(): string {
    return this.nome
}

getPreco(): number {
    return this.preco
}

getTempoEstimado(): number {
    return this.tempoEstimado;
}


}