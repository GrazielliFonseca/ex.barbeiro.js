"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacaoService = void 0;
const solicitacao_1 = require("../model/solicitacao");
const medicamento_1 = __importDefault(require("./medicamento"));
class SolicitacaoService {
    lista = [];
    medicamento = medicamento_1.default.getInstance();
    constructor() {
    }
    getSolicitacaoPorId(id) {
        return this.lista.find(s => s.getId() === id);
    }
    createSolicitacao(solicitacao) {
        const solicitacaoCreated = solicitacao_1.Solicitacao.create(solicitacao.nomePaciente, solicitacao.idadePaciente, solicitacao.medicoId, solicitacao.medicamentoId, solicitacao.descricaoPaciente, solicitacao.status, solicitacao.farmaceuticoId);
        this.medicamento.darBaixaEmEstoque(solicitacao.medicamentoId, 1);
        this.lista.push(solicitacaoCreated);
        return solicitacaoCreated;
    }
    getSolicitacao() {
        return this.lista;
    }
    AtualizacaoStatus(solicitacaoId, novoStatus, farmaceuticoId) {
        const solicitacao = this.lista.find(s => s.getId() === solicitacaoId);
        if (!solicitacao) {
            return undefined;
        }
        solicitacao.setStatus(novoStatus);
        solicitacao.setFarmaceuticoId(farmaceuticoId);
        return solicitacao;
    }
    getSolicitacoesPendentes() {
        return this.lista.filter(s => s.getStatus() === "Pendente");
    }
    getSolicitacoesPorPaciente(pacienteId) {
        return this.lista.filter(s => s.getNomePaciente() === pacienteId);
    }
}
exports.SolicitacaoService = SolicitacaoService;
