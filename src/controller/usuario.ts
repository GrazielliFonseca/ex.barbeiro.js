import { Request, Response } from 'express';
import { app } from "../server";
import { Usuario } from "../model/usuario";
import UsuarioService from "../service/usuario";

const listaUsuarios: Usuario[] = []; 
const usuarioService = new UsuarioService(listaUsuarios);

export function UsuarioController() {
    
    app.post("/usuarios", async (req: Request, res: Response) => {
        try {
            const { nome, tipo, senha, email } = req.body;

            if (!nome || !tipo || !senha || !email) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
            
            if (usuarioService.getUsuarioByEmail(email)) {
                return res.status(409).json({ error: 'Email já cadastrado.' });
            }

            const novoUsuario: Usuario = usuarioService.createUsuario({
                nome,
                tipo,
                senha,
                email,
            });

            return res.status(201).json({
                id: novoUsuario.getId(),
                nome: novoUsuario.getNome(),
                tipo: novoUsuario.getTipo(),
                email: novoUsuario.getEmail(),
            });

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.get("/usuarios", (req: Request, res: Response) => {
        const lista = usuarioService.getUsuario();

        const listaSegura = lista.map(usuario => ({
            id: usuario.getId(),
            nome: usuario.getNome(),
            tipo: usuario.getTipo(),
            email: usuario.getEmail(),
        }));
        
        return res.status(200).json(listaSegura);
    });
    
    app.post("/usuarios/login", (req: Request, res: Response) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
             return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const usuarioAutenticado = usuarioService.autenticar(email, senha);

        if (!usuarioAutenticado) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        return res.status(200).json({ 
            mensagem: 'Autenticação bem-sucedida',
            usuario: {
                id: usuarioAutenticado.getId(),
                nome: usuarioAutenticado.getNome(),
                tipo: usuarioAutenticado.getTipo(),
                email: usuarioAutenticado.getEmail(),
            }
        });
    });

    app.get("/usuarios/tipo/:tipo", (req: Request, res: Response) => {
        const tipoBusca: string = req.params.tipo;

        const listaPorTipo = usuarioService.getUsuarioByTipo(tipoBusca);

        const listaSegura = listaPorTipo.map(usuario => ({
            id: usuario.getId(),
            nome: usuario.getNome(),
            email: usuario.getEmail(),
            tipo: usuario.getTipo(),
        }));

        if (listaSegura.length === 0) {
            return res.status(404).json({ message: `Nenhum usuário encontrado com o tipo '${tipoBusca}'.` });
        }

        return res.status(200).json(listaSegura);
    });

    app.get("/usuarios/buscar", (req: Request, res: Response) => {
        const { nome, email } = req.query;

        if (nome) {
            const usuario = usuarioService.getUsuarioByNome(nome as string);
            if (usuario) {
                return res.status(200).json({
                    id: usuario.getId(),
                    nome: usuario.getNome(),
                    tipo: usuario.getTipo(),
                    email: usuario.getEmail(),
                });
            }
        }

        if (email) {
            const usuario = usuarioService.getUsuarioByEmail(email as string);
            if (usuario) {
                return res.status(200).json({
                    id: usuario.getId(),
                    nome: usuario.getNome(),
                    tipo: usuario.getTipo(),
                    email: usuario.getEmail(),
                });
            }
        }
        
        return res.status(404).json({ message: "Usuário não encontrado por nome ou email" });
    });
}