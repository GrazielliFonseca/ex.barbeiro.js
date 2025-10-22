import { Servico } from "../model/medicamento";

export class ServicoService{
    lista: Servico[] = [];

    constructor(public armazenamento: Servico[]) {
        this.lista = armazenamento;
    }

    createServico(servico: {
      nome: string;
      preco: number;
      tempoEstimado: number;
    }): Servico {
        const uuid = crypto.randomUUID();
        const servicoCreated = new Servico(
            uuid,
            servico.nome,
            servico.preco,
            servico.tempoEstimado
        );
        this.lista.push(servicoCreated);
        return servicoCreated
    }

    getServicos(): Servico[] {
        return this.lista;
    }
}