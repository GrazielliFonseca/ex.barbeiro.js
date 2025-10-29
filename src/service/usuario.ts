import { Usuario } from "../model/usuario";

export default class UsuarioService {
  lista: Usuario[] = [];

  constructor(public armazenamento: Usuario[]) {
    this.lista = armazenamento;
  }

  createUsuario(usuario: {
    nome: string;
    tipo: string;
    idade: number;
    senha: string;
    email: string;
  }): Usuario {
    const usuarioCreated = Usuario.create(
        usuario.nome,
        usuario.tipo,
        usuario.idade,
        usuario.senha,
        usuario.email
    );
    this.lista.push(usuarioCreated);
    return usuarioCreated
   }

  public getUsuario(): Usuario[] {
    return this.lista
  }

  public getUsuarioByNome(nome: string): Usuario | undefined {
    return this.lista.find((user: Usuario) => user.getNome() === nome);
  }

  public getUsuarioByEmail(email: string): Usuario | undefined {
    return this.lista.find((user: Usuario) => user.getEmail() === email);
  }

  public autenticar(email: string, senhaDigitada: string): Usuario | undefined {
    const usuario = this.getUsuarioByEmail(email);

    if (usuario && usuario.getSenha() === senhaDigitada) {
      return usuario;
    }

    return undefined;
  }

  public getUsuarioByTipo(tipo: string): Usuario[] {
    return this.lista.filter((user: Usuario) => user.getTipo() === tipo);
  }
  
  public getMedicos(): Usuario[] {
    return this.getUsuarioByTipo("Médico");
  }

  public validarPermissao(usuario: Usuario, permissaoNecessaria: string): boolean {
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