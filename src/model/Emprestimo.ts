import { DatabaseModel } from './DatabaseModel.js';
import type EmprestimoDTO from '../dto/EmprestimoDTO.js';

const database = new DatabaseModel().pool;

interface EmprestimoDetalhado extends EmprestimoDTO {
    aluno: {
        id_aluno: number;
        nome: string;
        email: string;
        turma: string;
    };
    equipamento: {
        id_equipamento: number;
        descricao: string;
        patrimonio: string;
        tipo: string;
    };
}

class Emprestimo {
    static async listar(): Promise<EmprestimoDetalhado[]> {
        const result = await database.query(
            `SELECT e.id_emprestimo, e.fk_id_aluno, e.fk_id_equipamento, e.data_emprestimo, e.data_devolucao,
                    a.id_aluno, a.nome AS aluno_nome, a.email AS aluno_email, a.turma AS aluno_turma,
                    eq.id_equipamento AS equipamento_id, eq.descricao AS equipamento_descricao,
                    eq.patrimonio AS equipamento_patrimonio, eq.tipo AS equipamento_tipo
             FROM emprestimo e
             INNER JOIN aluno a ON a.id_aluno = e.fk_id_aluno
             INNER JOIN equipamento eq ON eq.id_equipamento = e.fk_id_equipamento
             ORDER BY e.data_emprestimo DESC`
        );

        return result.rows.map((row) => ({
            id_emprestimo: row.id_emprestimo,
            fk_id_aluno: row.fk_id_aluno,
            fk_id_equipamento: row.fk_id_equipamento,
            data_emprestimo: row.data_emprestimo,
            data_devolucao: row.data_devolucao,
            aluno: {
                id_aluno: row.id_aluno,
                nome: row.aluno_nome,
                email: row.aluno_email,
                turma: row.aluno_turma
            },
            equipamento: {
                id_equipamento: row.equipamento_id,
                descricao: row.equipamento_descricao,
                patrimonio: row.equipamento_patrimonio,
                tipo: row.equipamento_tipo
            }
        }));
    }

    static async cadastrar(emprestimo: EmprestimoDTO): Promise<EmprestimoDetalhado> {
        const client = await database.connect();

        try {
            await client.query('BEGIN');

            const alunoAtivos = await client.query(
                'SELECT COUNT(*)::int AS total FROM emprestimo WHERE fk_id_aluno = $1 AND data_devolucao IS NULL',
                [emprestimo.fk_id_aluno]
            );

            if (Number(alunoAtivos.rows[0].total) >= 2) {
                throw new Error('Aluno ja possui o limite maximo de 2 emprestimos ativos.');
            }

            const equipamentoAtivo = await client.query(
                'SELECT COUNT(*)::int AS total FROM emprestimo WHERE fk_id_equipamento = $1 AND data_devolucao IS NULL',
                [emprestimo.fk_id_equipamento]
            );

            if (Number(equipamentoAtivo.rows[0].total) > 0) {
                throw new Error('Equipamento ja possui um emprestimo ativo.');
            }

            const result = await client.query(
                `INSERT INTO emprestimo (fk_id_aluno, fk_id_equipamento, data_emprestimo, data_devolucao)
                 VALUES ($1, $2, NOW(), NULL)
                 RETURNING *`,
                [emprestimo.fk_id_aluno, emprestimo.fk_id_equipamento]
            );

            await client.query('COMMIT');

            const emprestimoCriado = result.rows[0] as EmprestimoDTO;
            const dados = await this.buscarPorId(emprestimoCriado.id_emprestimo as number);

            if (!dados) {
                throw new Error('Erro ao buscar o emprestimo cadastrado.');
            }

            return dados;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async buscarPorId(id: number): Promise<EmprestimoDetalhado | null> {
        const result = await database.query(
            `SELECT e.id_emprestimo, e.fk_id_aluno, e.fk_id_equipamento, e.data_emprestimo, e.data_devolucao,
                    a.id_aluno, a.nome AS aluno_nome, a.email AS aluno_email, a.turma AS aluno_turma,
                    eq.id_equipamento AS equipamento_id, eq.descricao AS equipamento_descricao,
                    eq.patrimonio AS equipamento_patrimonio, eq.tipo AS equipamento_tipo
             FROM emprestimo e
             INNER JOIN aluno a ON a.id_aluno = e.fk_id_aluno
             INNER JOIN equipamento eq ON eq.id_equipamento = e.fk_id_equipamento
             WHERE e.id_emprestimo = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];
        return {
            id_emprestimo: row.id_emprestimo,
            fk_id_aluno: row.fk_id_aluno,
            fk_id_equipamento: row.fk_id_equipamento,
            data_emprestimo: row.data_emprestimo,
            data_devolucao: row.data_devolucao,
            aluno: {
                id_aluno: row.id_aluno,
                nome: row.aluno_nome,
                email: row.aluno_email,
                turma: row.aluno_turma
            },
            equipamento: {
                id_equipamento: row.equipamento_id,
                descricao: row.equipamento_descricao,
                patrimonio: row.equipamento_patrimonio,
                tipo: row.equipamento_tipo
            }
        };
    }

    static async devolver(id: number): Promise<EmprestimoDetalhado | null> {
        const result = await database.query(
            `UPDATE emprestimo
             SET data_devolucao = NOW()
             WHERE id_emprestimo = $1 AND data_devolucao IS NULL
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        const emprestimo = result.rows[0] as EmprestimoDTO;
        return this.buscarPorId(emprestimo.id_emprestimo as number);
    }

    static async remover(id: number): Promise<boolean> {
        const result = await database.query('DELETE FROM emprestimo WHERE id_emprestimo = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}

export default Emprestimo;
