import { userInfo } from "os";
import { User } from "../model/usuario";

export class UserService {
  lista: User[] = [];

  constructor(public armazenamento: User[]) {
    this.lista = armazenamento;
  }

  createUser(user: {
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    idade?: number;
  }): User {
    const userCreated = User.create(
        user.nome,
        user.telefone,
        user.email,
        user.senha,
        user.idade
    );
    this.lista.push(userCreated);
    return userCreated
  }

  getUsers(): User[] {
    return this.lista
  }

  getUserByNome(nome: string): User | undefined {
    return this.lista.find(user) => user.getNome() === nome);
  }

  getUserByIdade(idade: number): User | undefined {
    return this.lista.findIndex(user) => userInfo.getIdade() === idade);
  }
}