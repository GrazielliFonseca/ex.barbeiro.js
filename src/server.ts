import express from 'express';
import { UserController} from './controller/user';
import { ServicoController } from './controller/medicamento';
import { BarbeiroController } from './controller/solicitacao';
import { AgendamentoController } from './controller/agendamento';

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

UserController();
ServicoController();
BarbeiroController();
AgendamentoController();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 
