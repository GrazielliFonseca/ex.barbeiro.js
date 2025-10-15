import { Servico } from "../model/medicamento";
import { app } from "../server";
import { ServicoService } from "../service/servico";

export function ServicoController() {
  const list: Servico[] = [];
  const service = new ServicoService(list);

  app.get("/servicos", (req, res) => {
    const servicos = service.getServicos();
    res.json(servicos);
  });

  app.post("/servicos", (req, res) => {
    const servicoData = req.body;
    const newServico = service.createServico(servicoData);
    res.status(201).json(newServico);
  });
}