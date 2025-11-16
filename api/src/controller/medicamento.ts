import { Medicamento } from "../model/medicamento";
import { app } from "../server";
import MedicamentoService from "../service/medicamento";

const mockMedicamentos: Medicamento[] = []; 
const medicamentoService = new MedicamentoService();

export function MedicamentoController() { 

    app.get("/api/medicamentos", (req, res) => {
        try {
            const medicamentos = medicamentoService.getTodosMedicamentos();
            res.status(200).json(medicamentos);
        } catch (error) {
            console.error("Erro ao listar medicamentos:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });

    app.post("/api/medicamentos", (req, res) => {
        const dados = req.body;
        
        try {
            const novoMedicamento = medicamentoService.criarMedicamento(
                dados.nomeMedicamento,
                dados.estoque,
                dados.informacoes 
            );

            res.status(201).json(novoMedicamento);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    });

    app.get("/api/medicamentos/:id", (req , res) => {
        const { id } = req.params; 

        try {
            const medicamento = medicamentoService.getMedicamentoPorId(id); 

            if (medicamento) {
                return res.status(200).json(medicamento);
            }
            
            return res.status(404).json({ message: `Medicamento com ID '${id}' não encontrado.` });
        } catch (error) {
            console.error("Erro ao buscar medicamento por ID:", error);
            res.status(500).json({ message: "Erro interno do servidor." });
        }
    });
    
    app.patch("/api/medicamentos/:id/baixa", (req , res ) => {
        const { id } = req.params;
        const { quantidade } = req.body;
        
        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return res.status(400).json({ message: "A quantidade para baixa deve ser um número positivo." });
        }

        const sucesso = medicamentoService.darBaixaEmEstoque(id, quantidade);

        if (sucesso) {
            const estoqueAtual = medicamentoService.verificarEstoque(id);
            res.status(200).json({ 
                message: `Baixa de ${quantidade} unidades realizada.`, 
                estoqueAtual: estoqueAtual 
            });
        } else {
            const medicamento = medicamentoService.getMedicamentoPorId(id);
            if (!medicamento) {
                return res.status(404).json({ message: `Medicamento com ID '${id}' não encontrado.` });
            }
            return res.status(400).json({ 
                message: `Estoque insuficiente. Estoque atual: ${medicamento.getEstoque()}.` 
            });
        }
    });

    app.get("/api/medicamentos/status", (req, res) => {
        const { status } = req.query;

        if (!status || (status !== 'Crítico' && status !== 'Baixo' && status !== 'Normal' && status !== 'Esgotado')) {
            return res.status(400).json({ message: "O parâmetro 'status' é obrigatório e deve ser 'Crítico', 'Baixo', 'Normal' ou Esgotado." });
        }
        
        const medicamentosFiltrados = medicamentoService.getTodosMedicamentos().filter(med => 
             med.getStatusEstoque() === status
        );
        
        if (medicamentosFiltrados.length > 0) {
            return res.status(200).json(medicamentosFiltrados);
        }
        
        return res.status(404).json({ message: `Nenhum medicamento encontrado com status '${status}'.` });
    });
}
