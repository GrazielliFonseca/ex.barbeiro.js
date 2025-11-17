"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicamentoController = MedicamentoController;
const server_1 = require("../server");
const medicamento_1 = __importDefault(require("../service/medicamento"));
const medicamentoService = medicamento_1.default.getInstance();
function MedicamentoController() {
    server_1.app.get("/api/medicamentos", (req, res) => {
        try {
            const medicamentos = medicamentoService.getTodosMedicamentos();
            const medicamentosComStatus = medicamentos.map(med => ({
                id: med.getId(),
                nomeMedicamento: med.getNomeMedicamento(),
                estoque: med.getEstoque(),
                informacoes: med.getInformacoes(),
                statusEstoque: med.getStatusEstoque()
            }));
            res.status(200).json(medicamentosComStatus);
        }
        catch (error) {
            console.error("Erro ao listar medicamentos:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });
    server_1.app.post("/api/medicamentos", (req, res) => {
        const dados = req.body;
        try {
            const novoMedicamento = medicamentoService.criarMedicamento(dados.nomeMedicamento, dados.estoque, dados.informacoes);
            res.status(201).json({
                id: novoMedicamento.getId(),
                nomeMedicamento: novoMedicamento.getNomeMedicamento(),
                estoque: novoMedicamento.getEstoque(),
                informacoes: novoMedicamento.getInformacoes(),
                statusEstoque: novoMedicamento.getStatusEstoque()
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
    server_1.app.get("/api/medicamentos/:id", (req, res) => {
        const { id } = req.params;
        try {
            const medicamento = medicamentoService.getMedicamentoPorId(id);
            if (medicamento) {
                return res.status(200).json({
                    id: medicamento.getId(),
                    nomeMedicamento: medicamento.getNomeMedicamento(),
                    estoque: medicamento.getEstoque(),
                    informacoes: medicamento.getInformacoes(),
                    statusEstoque: medicamento.getStatusEstoque()
                });
            }
            return res.status(404).json({ message: `Medicamento com ID '${id}' não encontrado.` });
        }
        catch (error) {
            console.error("Erro ao buscar medicamento por ID:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });
    server_1.app.patch("/api/medicamentos/:id/baixa", (req, res) => {
        const { id } = req.params;
        const { quantidade } = req.body;
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade para baixa deve ser um número positivo." });
        }
        const sucesso = medicamentoService.darBaixaEmEstoque(id, quantidade);
        if (sucesso) {
            const estoqueAtual = medicamentoService.verificarEstoque(id);
            res.status(200).json({
                message: `Baixa de ${quantidade} unidades realizada.`,
                estoqueAtual: estoqueAtual
            });
        }
        else {
            const medicamento = medicamentoService.getMedicamentoPorId(id);
            if (!medicamento) {
                return res.status(404).json({ message: `Medicamento com ID '${id}' não encontrado.` });
            }
            return res.status(400).json({
                message: `Estoque insuficiente. Estoque atual: ${medicamento.getEstoque()}.`
            });
        }
    });
    server_1.app.get("/api/medicamentos/status", (req, res) => {
        const { status } = req.query;
        if (!status || (status !== 'Crítico' && status !== 'Baixo' && status !== 'Normal' && status !== 'Esgotado')) {
            return res.status(400).json({ message: "O parâmetro 'status' é obrigatório e deve ser 'Crítico', 'Baixo', 'Normal' ou Esgotado." });
        }
        const medicamentosFiltrados = medicamentoService.getTodosMedicamentos().filter(med => med.getStatusEstoque() === status);
        if (medicamentosFiltrados.length > 0) {
            return res.status(200).json(medicamentosFiltrados);
        }
        return res.status(404).json({ message: `Nenhum medicamento encontrado com status '${status}'.` });
    });
    server_1.app.patch("/api/medicamentos/:id/adicionar", (req, res) => {
        const { id } = req.params;
        const { quantidade } = req.body;
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade deve ser um número positivo." });
        }
        const sucesso = medicamentoService.adicionarEstoque(id, quantidade);
        if (sucesso) {
            const medicamento = medicamentoService.getMedicamentoPorId(id);
            res.status(200).json({
                message: `${quantidade} unidades adicionadas ao estoque.`,
                estoqueAtual: medicamento?.getEstoque(),
                statusEstoque: medicamento?.getStatusEstoque()
            });
        }
        else {
            return res.status(404).json({ message: `Medicamento com ID '${id}' não encontrado.` });
        }
    });
}
