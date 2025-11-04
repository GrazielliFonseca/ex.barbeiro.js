import { Solicitacao } from "../model/solicitacao";
import { app } from "../server";
import { SolicitacaoService } from "../service/solicitacao";

type SolicitacaoStatus = "Pendente" | "Aprovada" | "Rejeitada";

export function SolicitacaoController() {
  const list: Solicitacao[] = [];
  const service = new SolicitacaoService(list);

  app.get("/solicitacoes", (req, res) => {
    try {
      const solicitacoes = service.getSolicitacao();
      res.json(solicitacoes);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  app.post("/solicitacoes", (req, res) => {
    try {
      const solicitacaoData = req.body as {
        nomePaciente: string,
        idadePaciente: number,
        medicoId: string,
        medicamentoId: string,
        descricaoPaciente: string,
        dataHoraSolicitacao: Date,
        status: SolicitacaoStatus,
        farmaceuticoId: string
      };

      const novaSolicitacao = service.createSolicitacao(solicitacaoData);
      res.status(201).json(novaSolicitacao);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao criar solicitação.";
      res.status(400).json({ message: errorMessage });
    }
  });

  app.get("/solicitacoes/pendentes", (req, res) => {
    try {
      const pendentes = service.getSolicitacoesPendentes();
      res.status(200).json(pendentes);
    } catch (error) {
      console.error("Erro ao buscar pendentes:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  app.get("/solicitacoes/paciente/:pacienteId", (req, res) => {
    try {
      const { pacienteId } = req.params;
      const solicitacoes = service.getSolicitacoesPorPaciente(pacienteId);

      if (solicitacoes.length === 0) {
        return res.status(404).json({ message: "Nenhuma solicitação encontrada para este paciente." });
      }

      res.status(200).json(solicitacoes);
    } catch (error) {
      console.error("Erro ao buscar solicitações por paciente:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  });

  app.put("/solicitacoes/:id/status", (req, res) => {
    try {
      const { id } = req.params;
      const { novoStatus, farmaceuticoId } = req.body as { novoStatus: SolicitacaoStatus, farmaceuticoId: string };

      if (!novoStatus || !farmaceuticoId) {
        return res.status(400).json({ message: "Os campos 'novoStatus' e 'farmaceuticoId' são obrigatórios." });
      }

      const solicitacaoAtualizada = service.AtualizacaoStatus(id, novoStatus, farmaceuticoId);

      if (!solicitacaoAtualizada) {
        return res.status(404).json({ message: "Solicitação não encontrada." });
      }

      res.status(200).json(solicitacaoAtualizada);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao atualizar status da solicitação.";
      res.status(400).json({ message: errorMessage });
    }
  });
}
