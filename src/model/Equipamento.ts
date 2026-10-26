import { DatabaseModel } from './DatabaseModel.js';
import type EquipamentoDTO from '../dto/EquipamentoDTO.js';

const database = new DatabaseModel().pool;

class Equipamento {
    static async listar(): Promise<EquipamentoDTO[]> {
        const result = await database.query('SELECT id_equipamento, descricao, patrimonio, tipo FROM equipamento ORDER BY descricao');
        return result.rows as EquipamentoDTO[];
    }

    static async buscarPorId(id: number): Promise<EquipamentoDTO | null> {
        const result = await database.query(
            'SELECT id_equipamento, descricao, patrimonio, tipo FROM equipamento WHERE id_equipamento = $1',
            [id]
        );

        return (result.rows[0] as EquipamentoDTO | undefined) ?? null;
    }

    static async cadastrar(equipamento: EquipamentoDTO): Promise<EquipamentoDTO> {
        const result = await database.query(
            'INSERT INTO equipamento (descricao, patrimonio, tipo) VALUES ($1, $2, $3) RETURNING id_equipamento, descricao, patrimonio, tipo',
            [equipamento.descricao, equipamento.patrimonio, equipamento.tipo]
        );

        return result.rows[0] as EquipamentoDTO;
    }

    static async atualizar(id: number, equipamento: EquipamentoDTO): Promise<EquipamentoDTO | null> {
        const result = await database.query(
            `UPDATE equipamento
             SET descricao = $1, patrimonio = $2, tipo = $3
             WHERE id_equipamento = $4
             RETURNING id_equipamento, descricao, patrimonio, tipo`,
            [equipamento.descricao, equipamento.patrimonio, equipamento.tipo, id]
        );

        return (result.rows[0] as EquipamentoDTO | undefined) ?? null;
    }

    static async remover(id: number): Promise<boolean> {
        const result = await database.query('DELETE FROM equipamento WHERE id_equipamento = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}

export default Equipamento;
