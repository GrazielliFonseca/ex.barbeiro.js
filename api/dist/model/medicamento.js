"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medicamento = void 0;
const node_crypto_1 = require("node:crypto");
class Medicamento {
    id;
    nomeMedicamento;
    estoque;
    informacoes;
    constructor(id, nomeMedicamento, estoque, informacoes) {
        this.id = id;
        this.nomeMedicamento = nomeMedicamento;
        this.estoque = estoque;
        this.informacoes = informacoes;
        if (!nomeMedicamento)
            throw new Error('Nome obrigatório..');
        if (!informacoes)
            throw new Error('Informações obrigatório');
        if (estoque === undefined || estoque === null || estoque < 0)
            throw new Error('Estoque Obrigatório e deve ser um valor maior que zero.');
    }
    static create(nomeMedicamento, estoque, informacoes) {
        const id = (0, node_crypto_1.randomUUID)();
        return new Medicamento(id, nomeMedicamento, estoque, informacoes);
    }
    getId() {
        return this.id;
    }
    getEstoque() {
        return this.estoque;
    }
    getNomeMedicamento() {
        return this.nomeMedicamento;
    }
    getInformacoes() {
        return this.informacoes;
    }
    getStatusEstoque() {
        if (this.estoque <= 0) {
            return 'Esgotado';
        }
        if (this.estoque <= 10) {
            return 'Crítico';
        }
        if (this.estoque <= 20) {
            return 'Baixo';
        }
        return 'Normal';
    }
    darBaixa(quantidade) {
        if (quantidade > 0 && this.estoque >= quantidade) {
            this.estoque -= quantidade;
        }
        else if (quantidade > this.estoque) {
            console.error('Erro: Quantidade solicitada maior que o estoque.');
        }
    }
    adicionarEstoque(quantidade) {
        if (quantidade > 0) {
            this.estoque += quantidade;
        }
    }
}
exports.Medicamento = Medicamento;
