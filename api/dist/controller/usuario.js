"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicoUsuario = void 0;
exports.UsuarioController = UsuarioController;
const server_1 = require("../server");
const usuario_1 = __importDefault(require("../service/usuario"));
const listaUsuarios = [];
const usuarioService = new usuario_1.default(listaUsuarios);
exports.servicoUsuario = usuarioService;
function UsuarioController() {
    server_1.app.post("/api/usuarios", async (req, res) => {
        try {
            const { nome, tipo, senha, email } = req.body;
            if (!nome || !tipo || !senha || !email) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            if (usuarioService.getUsuarioByEmail(email)) {
                return res.status(409).json({ error: 'Email já cadastrado.' });
            }
            const novoUsuario = usuarioService.createUsuario({
                nome,
                tipo,
                senha,
                email,
            });
            return res.status(201).json({
                id: novoUsuario.getId(),
                nome: novoUsuario.getNome(),
                tipo: novoUsuario.getTipo(),
                email: novoUsuario.getEmail(),
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    server_1.app.get("/api/usuarios", (req, res) => {
        const lista = usuarioService.getUsuario();
        const listaSegura = lista.map(usuario => ({
            id: usuario.getId(),
            nome: usuario.getNome(),
            tipo: usuario.getTipo(),
            email: usuario.getEmail(),
        }));
        return res.status(200).json(listaSegura);
    });
    server_1.app.post("/api/usuarios/login", (req, res) => {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }
        const usuarioAutenticado = usuarioService.autenticar(email, senha);
        if (!usuarioAutenticado) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        return res.status(200).json({
            mensagem: 'Autenticação bem-sucedida',
            usuario: {
                id: usuarioAutenticado.getId(),
                nome: usuarioAutenticado.getNome(),
                tipo: usuarioAutenticado.getTipo(),
                email: usuarioAutenticado.getEmail(),
            }
        });
    });
    server_1.app.get("/api/usuarios/tipo/:tipo", (req, res) => {
        const tipoBusca = req.params.tipo;
        const listaPorTipo = usuarioService.getUsuarioByTipo(tipoBusca);
        const listaSegura = listaPorTipo.map(usuario => ({
            id: usuario.getId(),
            nome: usuario.getNome(),
            email: usuario.getEmail(),
            tipo: usuario.getTipo(),
        }));
        if (listaSegura.length === 0) {
            return res.status(404).json({ message: `Nenhum usuário encontrado com o tipo '${tipoBusca}'.` });
        }
        return res.status(200).json(listaSegura);
    });
    server_1.app.get("/api/usuarios/buscar", (req, res) => {
        const { nome, email } = req.query;
        if (nome) {
            const usuario = usuarioService.getUsuarioByNome(nome);
            if (usuario) {
                return res.status(200).json({
                    id: usuario.getId(),
                    nome: usuario.getNome(),
                    tipo: usuario.getTipo(),
                    email: usuario.getEmail(),
                });
            }
        }
        if (email) {
            const usuario = usuarioService.getUsuarioByEmail(email);
            if (usuario) {
                return res.status(200).json({
                    id: usuario.getId(),
                    nome: usuario.getNome(),
                    tipo: usuario.getTipo(),
                    email: usuario.getEmail(),
                });
            }
        }
        return res.status(404).json({ message: "Usuário não encontrado por nome ou email" });
    });
}
