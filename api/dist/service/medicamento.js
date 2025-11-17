"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medicamento_1 = require("../model/medicamento");
class MedicamentoService {
    static instance;
    lista = [];
    constructor() { }
    static getInstance() {
        if (!MedicamentoService.instance) {
            MedicamentoService.instance = new MedicamentoService();
        }
        return MedicamentoService.instance;
    }
    getTodosMedicamentos() {
        return this.lista;
    }
    getMedicamentoPorId(id) {
        return this.lista.find((med) => med.getId() === id);
    }
    verificarEstoque(id) {
        const medicamento = this.getMedicamentoPorId(id);
        if (medicamento) {
            return medicamento.getEstoque();
        }
        return undefined;
    }
    darBaixaEmEstoque(id, quantidade) {
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
    criarMedicamento(nomeMedicamento, estoque, informacoes) {
        const novoMedicamento = medicamento_1.Medicamento.create(nomeMedicamento, estoque, informacoes);
        this.lista.push(novoMedicamento);
        return novoMedicamento;
    }
    adicionarEstoque(id, quantidade) {
        const medicamento = this.getMedicamentoPorId(id);
        if (medicamento) {
            medicamento.adicionarEstoque(quantidade);
            return true;
        }
        return false;
    }
    getStatusEstoque(id) {
        const medicamento = this.getMedicamentoPorId(id);
        if (medicamento) {
            return medicamento.getStatusEstoque();
        }
        return undefined;
    }
}
exports.default = MedicamentoService;
