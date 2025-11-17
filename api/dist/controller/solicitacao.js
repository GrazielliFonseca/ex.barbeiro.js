"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacaoController = SolicitacaoController;
const server_1 = require("../server");
const solicitacao_1 = require("../service/solicitacao");
function SolicitacaoController() {
    const service = new solicitacao_1.SolicitacaoService();
    server_1.app.get("/api/solicitacoes", (req, res) => {
        try {
            const solicitacoes = service.getSolicitacao();
            res.json(solicitacoes);
        }
        catch (error) {
            console.error("Erro ao buscar solicitações:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });
    server_1.app.post("/api/solicitacoes", (req, res) => {
        try {
            const solicitacaoData = req.body;
            const novaSolicitacao = service.createSolicitacao(solicitacaoData);
            res.status(201).json(novaSolicitacao);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar solicitação.";
            res.status(400).json({ message: errorMessage });
        }
    });
    server_1.app.get("/api/solicitacoes/pendentes", (req, res) => {
        try {
            const pendentes = service.getSolicitacoesPendentes();
            res.status(200).json(pendentes);
        }
        catch (error) {
            console.error("Erro ao buscar pendentes:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });
    server_1.app.get("/api/solicitacoes/paciente/:nomePaciente", (req, res) => {
        try {
            const { nomePaciente } = req.params;
            const solicitacoes = service.getSolicitacoesPorPaciente(nomePaciente);
            if (solicitacoes.length === 0) {
                return res.status(404).json({ message: "Nenhuma solicitação encontrada para este paciente." });
            }
            res.status(200).json(solicitacoes);
        }
        catch (error) {
            console.error("Erro ao buscar solicitações por paciente:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });
    server_1.app.put("/api/solicitacoes/:id/status", (req, res) => {
        try {
            const { id } = req.params;
            const { novoStatus, farmaceuticoId } = req.body;
            if (!novoStatus || !farmaceuticoId) {
                return res.status(400).json({ message: "Os campos 'novoStatus' e 'farmaceuticoId' são obrigatórios." });
            }
            const solicitacaoAtualizada = service.AtualizacaoStatus(id, novoStatus, farmaceuticoId);
            if (!solicitacaoAtualizada) {
                return res.status(404).json({ message: "Solicitação não encontrada." });
            }
            res.status(200).json(solicitacaoAtualizada);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar status da solicitação.";
            res.status(400).json({ message: errorMessage });
        }
    });
}
