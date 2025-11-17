"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const node_crypto_1 = require("node:crypto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Usuario {
    id;
    nome;
    tipo;
    senha;
    email;
    constructor(id, nome, tipo, senha, email) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.senha = senha;
        this.email = email;
        if (!nome)
            throw new Error('Nome obrigatório');
        if (!tipo)
            throw new Error('Tipo obrigatório');
        if (!senha)
            throw new Error('Senha obrigatória');
        if (!email)
            throw new Error('Email obrigatório');
    }
    static create(nome, tipo, senha, email) {
        const id = (0, node_crypto_1.randomUUID)();
        const hashedPassword = bcryptjs_1.default.hashSync(senha);
        return new Usuario(id, nome, tipo, hashedPassword, email);
    }
    verifyPassword(senhaDigitada) {
        return bcryptjs_1.default.compareSync(senhaDigitada, this.senha);
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getTipo() {
        return this.tipo;
    }
    getSenha() {
        return this.senha;
    }
    getEmail() {
        return this.email;
    }
}
exports.Usuario = Usuario;
