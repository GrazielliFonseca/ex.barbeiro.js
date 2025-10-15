import { Barbeiro } from '../model/barbeiro';

export class BarbeiroService {
    lista: Barbeiro[] = [];

    constructor(public armazenamento: Barbeiro[]) {
        this.lista = armazenamento;
    }

    createBarbeiro(barbeiro: {
       nome:string;
       diasTrabalho:string[];
       horaInicio:string;
       horaFim:string;
    }): Barbeiro {
      const uuid = crypto.randomUUID();
      const barbeiroCreated = new Barbeiro(
        uuid,
        barbeiro.nome,
        barbeiro.diasTrabalho,
        barbeiro.horaInicio,
        barbeiro.horaFim
      );
      this.lista.push(barbeiroCreated);
      return barbeiroCreated;
    }

    getBarbeiro(): Barbeiro[] {
        return this.lista
    }
}