export class Medicamento {
  constructor(
    private id: string,
    private nomeMedicamento: string,
    private estoque: number,
    private informacoes: string
  ) {
    if (!nomeMedicamento) throw new Error('Nome obrigatório..');
    if (!informacoes) throw new Error('Informações obrigatório');
    if (estoque === undefined || estoque === null || estoque < 0)
      throw new Error('Estoque Obrigatório e deve ser um valor maior que zero.');
  }

  static create(
    nomeMedicamento: string,
    estoque: number,
    informacoes: string
  ) {
    const id = crypto.randomUUID(); 
    return new Medicamento(id, nomeMedicamento, estoque, informacoes);
  }

  public getId(): string {
    return this.id;
  }
  public getEstoque(): number {
    return this.estoque;
  }
  public getNomeMedicamento(): string {
    return this.nomeMedicamento;
  }
  public getInformacoes(): string {
    return this.informacoes;
  }

  public getStatusEstoque(): 'Baixo' | 'Normal' | 'Crítico' {
    if (this.estoque === undefined || this.estoque < 0) {
      return 'Normal';
    }

    if (this.estoque <= 10) {
      return 'Crítico';
    }

    if (this.estoque <= 20) {
      return 'Baixo';
    }

    return 'Normal';
  }

  public darBaixa(quantidade: number): void {
    if (quantidade > 0 && this.estoque >= quantidade) {
      this.estoque -= quantidade;
    } else if (quantidade > this.estoque) {
      console.error('Erro: Quantidade solicitada maior que o estoque.');
    }
  }

  public adicionarEstoque(quantidade: number): void {
    if (quantidade > 0) {
      this.estoque += quantidade;
    }
  }
}