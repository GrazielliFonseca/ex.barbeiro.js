import { Barbeiro } from "../model/barbeiro";
import { app } from "../server";
import { BarbeiroService } from "../service/barbeiro";

export function BarbeiroController() {
  const list: Barbeiro[] = [];
  const service = new BarbeiroService(list);

  app.get("/barbeiros", (req, res) => {
    const barbeiros = service.getBarbeiro();
    res.json(barbeiros);
  });

  app.post("/barbeiros", (req, res) => {
    const barbeiroData = req.body;
    const newBarbeiro = service.createBarbeiro(barbeiroData);
    res.status(201).json(newBarbeiro);
  });
}