import { Medicamento } from "../model/medicamento";

export default class MedicamentoService {
  lista: Medicamento[] = [];

  constructor(public armazenamento: Medicamento[]) {
    this.lista = armazenamento;
  }

  public getTodosMedicamentos(): Medicamento[] {
    return this.lista;
  }

  public getMedicamentoPorId(id: string): Medicamento | undefined {
    return this.lista.find((med: Medicamento) => med.getId() === id);
  }

  public verificarEstoque(id: string): number | undefined {
    const medicamento = this.getMedicamentoPorId(id);
    
    if (medicamento) {
      return medicamento.getEstoque();
    }

    return undefined;
  }
  
  public darBaixaEmEstoque(id: string, quantidade: number): boolean {
    const medicamento = this.getMedicamentoPorId(id);
    
    if (medicamento) {
      const estoqueAtual = medicamento.getEstoque();

      if (estoqueAtual >= quantidade) {
        medicamento.darBaixa(quantidade);
        return true;
      }
      return false;
    }
    
    return false;
  }
}