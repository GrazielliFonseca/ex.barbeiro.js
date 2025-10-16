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
        private formadeAdministracao: string,
        private medicamentoControlado: boolean,
        private requerRefrigeracao: boolean,
        private medicamentoGenerico: boolean,
        private posologia: string,
        private precoUnitario: number,
        private estoqueMinimo: number,
        private estoqueMaximo: number,
        private localizacao: string,
        private lote: string,
        private observacoes: string

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
    if (requerRefrigeracao) throw new Error('Refrigeração Obrigatória.')
    if (medicamentoControlado) throw new Error('Medicamento Controlado Obrigatório.')
    if (medicamentoGenerico) throw new Error('Medicamento Genérico Obrigatório.')
    if (posologia) throw new Error('Posologia Obrigatória.')
    if (precoUnitario) throw new Error('Preço Unitário Obrigatório.')
    if (estoqueMinimo) throw new Error('Estoque Minimo Obrigatório.')
    if (estoqueMaximo) throw new Error('Estoque Máximo Obrigatório')
    if (localizacao) throw new Error('Localizção Obrigatório')
    if (lote) throw new Error('Lote Obrigatório')
    if (observacoes) throw new Error ('Observações obrigatórias')
  }

static create( nomeMedicamento: string,
 principioAtivo: string,
 concentracao: string,
 formaFarmaceutica: string,
 indicacoesUso: string,
 efeitosAdversos: string,
 dosagemPadrao: string,
 interacoesMedicamentosas: string,
 codigoEstoque: string,
 quantidadeDisponivel: number,
 localizacaoFisica: string,
 dataValidadeLote: Date,
 fabricante: string,
 formadeAdministracao: string,
 medicamentoControlado: boolean,
 requerRefrigeracao: boolean,
 medicamentoGenerico: boolean,
 posologia: string,
 precoUnitario: number,
 estoqueMinimo: number,
 estoqueMaximo: number,
 localizacao: string,
 lote: string,
         observacoes: string){
    const id = crypto.randomUUID();
    return new Servico(id, nome, preco, tempoEstimado);
}

getNomeMedicamento(): string {
    return this.nomeMedicamento;
}

getPrincipioAtivo(): string {
    return this.principioAtivo;
}

getConcentracao(): string {
    return this.concentracao;
}

getFormaFarmaceutica(): string {
    return this.formaFarmaceutica;
}

getIndicacoesUso(): string {
    return this.indicacoesUso;
}
getEfeitosAdversos(): string {
    return this.efeitosAdversos;
}
getDosagemParao(): string {
    return this.dosagemPadrao;
}
getInteracoesMedicamentosas(): string {
    return this.interacoesMedicamentosas;
}
getCodigoEstoque(): string {
    return this.codigoEstoque;
}
getQuantidadeDisponivel():number  {
    return this.quantidadeDisponivel;
}
getLocalizacaoFisica(): string  {
    return this.localizacaoFisica;
}
getDataValidadeLote(): Date {
    return this.dataValidadeLote;
}
getFabricante(): string {
    return this.fabricante;
}
getFormadeAdministracao(): string {
    return this.formadeAdministracao;
}
getMedicamentoControlado(): boolean  {
    return this.medicamentoControlado;
}
getRequerReffrigeracao(): boolean  {
    return this.requerRefrigeracao;
}
getMedicamentoGenerico(): boolean  {
    return this.medicamentoGenerico;
}
getPosologia(): string {
    return this.posologia;
}
getPrecoUnitario(): number {
    return this.precoUnitario;
}
getEstoqueMinimo(): number {
    return this.estoqueMinimo;
}
getEstoqueMaximo(): number{
    return this.estoqueMaximo;
}
getLocalizacao(): string {
    return this.localizacao;
}
getLote(): string {
    return this.lote;
}
getObservacoes():string {
    return this.observacoes;
}
}
