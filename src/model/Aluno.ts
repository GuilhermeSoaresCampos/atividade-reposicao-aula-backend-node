import { DatabaseModel } from './DatabaseModel.js';
import type AlunoDTO from '../dto/AlunoDTO.js';

const database = new DatabaseModel().pool;

class Aluno {
    static async listar(): Promise<AlunoDTO[]> {
        const result = await database.query('SELECT id_aluno, nome, email, turma FROM aluno ORDER BY nome');
        return result.rows as AlunoDTO[];
    }

    static async buscarPorId(id: number): Promise<AlunoDTO | null> {
        const result = await database.query(
            'SELECT id_aluno, nome, email, turma FROM aluno WHERE id_aluno = $1',
            [id]
        );

        return (result.rows[0] as AlunoDTO | undefined) ?? null;
    }

    static async cadastrar(aluno: AlunoDTO): Promise<AlunoDTO> {
        const result = await database.query(
            'INSERT INTO aluno (nome, email, turma) VALUES ($1, $2, $3) RETURNING id_aluno, nome, email, turma',
            [aluno.nome, aluno.email, aluno.turma]
        );

        return result.rows[0] as AlunoDTO;
    }

    static async atualizar(id: number, aluno: AlunoDTO): Promise<AlunoDTO | null> {
        const result = await database.query(
            `UPDATE aluno
             SET nome = $1, email = $2, turma = $3
             WHERE id_aluno = $4
             RETURNING id_aluno, nome, email, turma`,
            [aluno.nome, aluno.email, aluno.turma, id]
        );

        return (result.rows[0] as AlunoDTO | undefined) ?? null;
    }

    static async remover(id: number): Promise<boolean> {
        const result = await database.query('DELETE FROM aluno WHERE id_aluno = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}

export default Aluno;
