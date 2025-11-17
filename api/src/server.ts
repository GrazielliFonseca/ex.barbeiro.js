
import express from "express";
import { UsuarioController } from "./controller/usuario";
import { MedicamentoController } from "./controller/medicamento";
import { SolicitacaoController } from "./controller/solicitacao";
import { servicoUsuario } from "./controller/usuario";
export const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

UsuarioController();

MedicamentoController();

SolicitacaoController();

// Inicializa um farmacêutico de teste
console.log("Inicializando usuário farmacêutico de teste...");
servicoUsuario.createUsuario({
  nome: "Farmacêutico Teste",
  tipo: "Farmacêutico",
  email: "farmaceutico@teste.com",
  senha: "teste123"
});
console.log("Usuário farmacêutico de teste criado com sucesso!");

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});