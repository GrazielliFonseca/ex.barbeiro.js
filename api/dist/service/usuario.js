"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../model/usuario");
class UsuarioService {
    armazenamento;
    lista = [];
    constructor(armazenamento) {
        this.armazenamento = armazenamento;
        this.lista = armazenamento;
    }
    createUsuario(usuario) {
        const usuarioCreated = usuario_1.Usuario.create(usuario.nome, usuario.tipo, usuario.senha, usuario.email);
        this.lista.push(usuarioCreated);
        return usuarioCreated;
    }
    getUsuario() {
        return this.lista;
    }
    getUsuarioByNome(nome) {
        return this.lista.find((usuario) => usuario.getNome() === nome);
    }
    getUsuarioByEmail(email) {
        return this.lista.find((usuario) => usuario.getEmail() === email);
    }
    autenticar(email, senhaDigitada) {
        const usuario = this.getUsuarioByEmail(email);
        if (usuario && usuario.verifyPassword(senhaDigitada)) {
            return usuario;
        }
        return undefined;
    }
    getUsuarioByTipo(tipo) {
        return this.lista.filter((usuario) => usuario.getTipo() === tipo);
    }
    getMedicos() {
        return this.getUsuarioByTipo("Médico");
    }
    getFarmaceuticos() {
        return this.getUsuarioByTipo("Farmacêutico");
    }
    getUsuarioPorId(id) {
        return this.lista.find((usuario) => usuario.getId() === id);
    }
    validarPermissao(usuario, permissaoNecessaria) {
        const tipo = usuario.getTipo();
        switch (permissaoNecessaria) {
            case 'acessoTotal':
                return tipo === 'Admin';
            case 'visualizarProntuario':
                return tipo === 'Médico' || tipo === 'Enfermeiro' || tipo === 'Admin';
            default:
                return false;
        }
    }
}
exports.default = UsuarioService;
