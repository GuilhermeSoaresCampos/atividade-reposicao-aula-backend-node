import { type Request, type Response } from 'express';
import Equipamento from '../model/Equipamento.js';
import type EquipamentoDTO from '../dto/EquipamentoDTO.js';

class EquipamentoController {
    static async todos(req: Request, res: Response) {
        try {
            return res.status(200).json(await Equipamento.listar());
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao listar equipamentos.' });
        }
    }

    static async cadastrar(req: Request, res: Response) {
        try {
            const equipamento = await Equipamento.cadastrar(req.body as EquipamentoDTO);
            return res.status(201).json(equipamento);
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel cadastrar o equipamento.'
            });
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'Identificador do equipamento invalido.' });
            }

            const equipamento = await Equipamento.atualizar(id, req.body as EquipamentoDTO);
            return equipamento
                ? res.status(200).json(equipamento)
                : res.status(404).json({ mensagem: 'Equipamento nao encontrado.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel atualizar o equipamento.'
            });
        }
    }

    static async remover(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ mensagem: 'Identificador do equipamento invalido.' });
            }

            const removido = await Equipamento.remover(id);
            return removido
                ? res.status(200).json({ mensagem: 'Equipamento removido com sucesso.' })
                : res.status(404).json({ mensagem: 'Equipamento nao encontrado.' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                mensagem: error instanceof Error ? error.message : 'Nao foi possivel remover o equipamento.'
            });
        }
    }
}

export default EquipamentoController;
