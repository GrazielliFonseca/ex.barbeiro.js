export class User {
  constructor(
    private id: string,
    private nome: string,
    private telefone: string,
    private email: string,
    private senha: string,
    private idade?: number
  ) {
    if (!nome) throw new Error('Nome obrigatório');
    if (!telefone) throw new Error('Telefone obrigatório');
    if (!email) throw new Error('Email obrigatório');
    if (!senha) throw new Error('Senha obrigatória');

    if (nome.length < 3) throw new Error("Nome muito curto")
    if (senha.charAt.length < 6) throw new Error("Senha muito curta");
}

static create(nome:string, telefone: string, email: string, senha: string, idade?: number) {
    const id = crypto.randomUUID();
    