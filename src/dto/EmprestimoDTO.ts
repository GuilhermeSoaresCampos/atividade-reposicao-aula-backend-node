export default interface EmprestimoDTO {
    id_emprestimo?: number;
    fk_id_aluno: number;
    fk_id_equipamento: number;
    data_emprestimo?: string | Date | null;
    data_devolucao?: string | Date | null;
}
