
import express from "express";
import { UsuarioController } from "./controller/usuario";
import { MedicamentoController } from "./controller/medicamento";
import { SolicitacaoController } from "./controller/solicitacao";
export const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});