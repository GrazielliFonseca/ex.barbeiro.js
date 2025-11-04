
import bcrypt from "bcryptjs";

export class Usuario {
  constructor(
    private id: string,
    private nome: string,
    private tipo: string,
    private senha: string,
    private email: string
  ) {
    if (!nome) throw new Error('Nome obrigatório');
    if (!tipo) throw new Error('Tipo obrigatório');
    if (!senha) throw new Error('Senha obrigatória');
    if (!email) throw new Error('Email obrigatório');
  }

static create(nome:string, tipo: string, senha: string, email: string) {
    const id = crypto.randomUUID();
    const hashedPassword = bcrypt.hashSync(senha);
    return new Usuario(id, nome, tipo, senha, email);
}
verifyPassword(senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
  }

public getId(): string {
    return this.id;
}
public getNome(): string {
    return this.nome;
}
public getTipo(): string {
    return this.tipo;
}
public getSenha(): string {
    return this.senha;
}
public getEmail(): string{
    return this.email;
}
}