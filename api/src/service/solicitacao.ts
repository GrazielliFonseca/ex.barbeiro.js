import { Solicitacao } from "../model/solicitacao";
import MedicamentoService from "./medicamento";

type SolicitacaoStatus = "Pendente" | "Aprovada" | "Rejeitada";

export class SolicitacaoService {
    lista: Solicitacao[] = [];
    medicamento = MedicamentoService.getInstance();


    constructor() {
    }

    public getSolicitacaoPorId(id: string): Solicitacao | undefined {
        return this.lista.find(s => s.getId() === id);
    }

createSolicitacao(solicitacao: {
    nomePaciente: string,
    idadePaciente: number,
    medicoId: string,
    medicamentoId: string,
    descricaoPaciente: string,
    status: SolicitacaoStatus,
    farmaceuticoId: string
}): Solicitacao {
    const solicitacaoCreated = Solicitacao.create(
        solicitacao.nomePaciente,
        solicitacao.idadePaciente,
        solicitacao.medicoId,
        solicitacao.medicamentoId,
        solicitacao.descricaoPaciente,
        solicitacao.status,
        solicitacao.farmaceuticoId
    );
    this.medicamento.darBaixaEmEstoque(solicitacao.medicamentoId,1)
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
    return this.lista.filter(s => s.getNomePaciente() === pacienteId);
}
}