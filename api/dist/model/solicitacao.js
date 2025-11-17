"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solicitacao = void 0;
const node_crypto_1 = require("node:crypto");
class Solicitacao {
    id;
    nomePaciente;
    idadePaciente;
    medicoId;
    medicamentoId;
    descricaoPaciente;
    data;
    status;
    farmaceuticoId;
    constructor(id, nomePaciente, idadePaciente, medicoId, medicamentoId, descricaoPaciente, data, status, farmaceuticoId) {
        this.id = id;
        this.nomePaciente = nomePaciente;
        this.idadePaciente = idadePaciente;
        this.medicoId = medicoId;
        this.medicamentoId = medicamentoId;
        this.descricaoPaciente = descricaoPaciente;
        this.data = data;
        this.status = status;
        this.farmaceuticoId = farmaceuticoId;
        if (!id)
            throw new Error("id obrigatório");
        if (!nomePaciente)
            throw new Error("Paciente obrigatório");
        if (!idadePaciente)
            throw new Error('Idade obrigatória');
        if (!medicoId)
            throw new Error("Médico obrigatório");
        if (!medicamentoId)
            throw new Error('Medicamento obrigatório');
        if (!descricaoPaciente)
            throw new Error('Descrição obrigatória');
    }
    static create(nomePaciente, idadePaciente, medicoId, medicamentoId, descricaoPaciente, status, farmaceuticoId) {
        const id = (0, node_crypto_1.randomUUID)();
        const now = new Date();
        return new Solicitacao(id, nomePaciente, idadePaciente, medicoId, medicamentoId, descricaoPaciente, now, status, farmaceuticoId);
    }
    getId() {
        return this.id;
    }
    getNomePaciente() {
        return this.nomePaciente;
    }
    getIdadePaciente() {
        return this.idadePaciente;
    }
    getMedicoId() {
        return this.medicoId;
    }
    getMedicamentoId() {
        return this.medicamentoId;
    }
    getDescricaoPaciente() {
        return this.descricaoPaciente;
    }
    getStatus() {
        return this.status;
    }
    getFarmaceuticoId() {
        return this.farmaceuticoId;
    }
    setStatus(novoStatus) {
        this.status = novoStatus;
    }
    setFarmaceuticoId(novoFarmaceuticoId) {
        this.farmaceuticoId = novoFarmaceuticoId;
    }
}
exports.Solicitacao = Solicitacao;
