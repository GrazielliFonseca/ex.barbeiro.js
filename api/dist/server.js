"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usuario_1 = require("./controller/usuario");
const medicamento_1 = require("./controller/medicamento");
const solicitacao_1 = require("./controller/solicitacao");
const usuario_2 = require("./controller/usuario");
exports.app = (0, express_1.default)();
exports.app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});
exports.app.use(express_1.default.json());
(0, usuario_1.UsuarioController)();
(0, medicamento_1.MedicamentoController)();
(0, solicitacao_1.SolicitacaoController)();
// Inicializa um farmacêutico de teste
console.log("Inicializando usuário farmacêutico de teste...");
usuario_2.servicoUsuario.createUsuario({
    nome: "Farmacêutico Teste",
    tipo: "Farmacêutico",
    email: "farmaceutico@teste.com",
    senha: "teste123"
});
console.log("Usuário farmacêutico de teste criado com sucesso!");
exports.app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
