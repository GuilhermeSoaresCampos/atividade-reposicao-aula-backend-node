import { type Request, type Response } from 'express';
import Emprestimo from '../model/Emprestimo.js';
import type EmprestimoDTO from '../dto/EmprestimoDTO.js';

class EmprestimoController {
    static async todos(req: Request, res: Response) {
        try {
            return res.status(200).json(await Emprestimo.listar());
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao listar emprestimos.' });
        }
    }

    static async cadastrar(req: Request, res: Response) {
        try {
            const emprestimo = await Emprestimo.cadastrar(req.body as EmprestimoDTO);
            return res.status(201).json(emprestimo);
        } catch (error) {
            console.error(error);
            const message = error instanceof Error ? error.message : 'Nao foi possivel cadastrar o emprestimo.';
            const status = message.includes('ativo') || message.includes('limite') ? 409 : 400;
            return res.status(status).json({ mensagem: message });
        }
    }

    static async devolver(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'Identificador do emprestimo invalido.' });
            }

            const emprestimo = await Emprestimo.devolver(id);
            return emprestimo
                ? res.status(200).json(emprestimo)
                : res.status(404).json({ mensagem: 'Emprestimo nao encontrado ou ja foi devolvido.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel registrar a devolucao.'
            });
        }
    }

    static async remover(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'Identificador do emprestimo invalido.' });
            }

            const removido = await Emprestimo.remover(id);
            return removido
                ? res.status(200).json({ mensagem: 'Emprestimo removido com sucesso.' })
                : res.status(404).json({ mensagem: 'Emprestimo nao encontrado.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel remover o emprestimo.'
            });
        }
    }
}

export default EmprestimoController;
