import { Agendamento } from "../model/agendamento";
import { app } from "../server";
import { AgendamentoService } from "../service/agendamento";

export function AgendamentoController() {
  const list: Agendamento[] = [];
  const service = new AgendamentoService(list);
  app.get("/agendamentos", (req, res) => {
    const agendamentos = service.getAgendamentos();
    res.json(agendamentos);
  });

  app.post("/agendamentos", (req, res) => {
    const agendamentoData = req.body;
    const newAgendamento = service.createAgendamento(agendamentoData);
    res.status(201).json(newAgendamento);
  });

  app.get("/agendamentos/search", (req, res) => {
    const { telefone } = req.query;

    if (telefone) {
      const agendamentos = service.getAgendamentoByCliente(
        telefone as string
      );
      if (agendamentos.length > 0) {
        return res.status(200).json(agendamentos);
      }
    }

    return res.status(404).json({ message: "Agendamentos não encontrados" });
  });
}