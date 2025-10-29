import { Solicitacao } from "../model/solicitacao";

type SolicitacaoStatus = "Pendente" | "Aprovada" | "Rejeitada";

export class SolicitacaoService {
    lista: Solicitacao[] = [];

    constructor(public armazenamento: Solicitacao[]) {
        this.lista = armazenamento;
    }

createSolicitacao(solicitacao: {
    pacienteId: string,
    medicoId: string,
    medicamentoId: string,
    descricaoPaciente: string,
    dataHoraSolicitacao: Date,
    status: SolicitacaoStatus,
    farmaceuticoId: string
}): Solicitacao {
    const solicitacaoCreated = Solicitacao.create(
        solicitacao.pacienteId,
        solicitacao.medicoId,
        solicitacao.medicamentoId,
        solicitacao.descricaoPaciente,
        solicitacao.dataHoraSolicitacao,
        solicitacao.status,
        solicitacao.farmaceuticoId
    );
    this.lista.push(solicitacaoCreated);
    return solicitacaoCreated;
}

getSolicitacao(): Solicitacao[] {
    return this.lista;
}

AtualizacaoStatus(solicitacaoId: string, novoStatus: SolicitacaoStatus, farmaceuticoId: string): Solicitacao | undefined {
    const solicitacao = this.lista.find(s => s.getId() === solicitacaoId);

    if (!solicitacao) {
        return undefined;
    }

    solicitacao.setStatus(novoStatus);
    solicitacao.setFarmaceuticoId(farmaceuticoId);

    return solicitacao;
}
getSolicitacoesPendentes(): Solicitacao[] {
    return this.lista.filter(s => s.getStatus() === "Pendente");
}
    
getSolicitacoesPorPaciente(pacienteId: string): Solicitacao[] {
    return this.lista.filter(s => s.getPacienteId() === pacienteId);
}
}