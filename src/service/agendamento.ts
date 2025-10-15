import { Agendamento } from "../model/agendamento";
import { User } from "../model/user";
import { Barbeiro } from "../model/barbeiro";
import { Servico } from "../model/medicamento";

export class AgendamentoService {
    lista: Agendamento[] = [];

    constructor(public armazenamento: Agendamento[]) {
        this.lista = armazenamento;
    }

    createAgendamento(agendamento: {
        cliente: any;
        barbeiro: any;
        servico: any;
        dataHora: Date;   
    }): Agendamento {
        const cliente = new User(
            agendamento.cliente.id,
            agendamento.cliente.nome,
            agendamento.cliente.telefone,
            agendamento.cliente.email,
            agendamento.cliente.senha,
            agendamento.cliente.idade,
        );

        const barbeiro = new Barbeiro(
            agendamento.barbeiro.id,
            agendamento.barbeiro.nome,
            agendamento.barbeiro.diasTrabalho,
            agendamento.barbeiro.horaInicio,
            agendamento.barbeiro.horaFim
        );

        const servico = new Servico(
            agendamento.servico.id,
            agendamento.servico.nome,
            agendamento.servico.preco,
            agendamento.servico.tempoEstimado
        );

        const agendamentoCreated = Agendamento.create(
            cliente,
            barbeiro,
            servico,
            new Date(agendamento.dataHora)
        );

        this.lista.push(agendamentoCreated);
        return agendamentoCreated;
    }

    getAgendamentos(): Agendamento[] {
        return this.lista;
    }

    getAgendamentoByCliente(telefone: string): Agendamento[] {
        return this.lista.filter(
            (agendamento) => agendamento.getCliente().getTelefone() === telefone
        );
    }
}