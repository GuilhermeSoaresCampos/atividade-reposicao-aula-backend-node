import { type Request, type Response } from 'express';
import Aluno from '../model/Aluno.js';
import type AlunoDTO from '../dto/AlunoDTO.js';

class AlunoController {
    static async todos(req: Request, res: Response) {
        try {
            return res.status(200).json(await Aluno.listar());
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao listar alunos.' });
        }
    }

    static async cadastrar(req: Request, res: Response) {
        try {
            const aluno = await Aluno.cadastrar(req.body as AlunoDTO);
            return res.status(201).json(aluno);
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel cadastrar o aluno.'
            });
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'Identificador do aluno invalido.' });
            }

            const aluno = await Aluno.atualizar(id, req.body as AlunoDTO);
            return aluno
                ? res.status(200).json(aluno)
                : res.status(404).json({ mensagem: 'Aluno nao encontrado.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel atualizar o aluno.'
            });
        }
    }

    static async remover(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'Identificador do aluno invalido.' });
            }

            const removido = await Aluno.remover(id);
            return removido
                ? res.status(200).json({ mensagem: 'Aluno removido com sucesso.' })
                : res.status(404).json({ mensagem: 'Aluno nao encontrado.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel remover o aluno.'
            });
        }
    }
}

export default AlunoController;