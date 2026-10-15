-- Atividade de reposicao: API REST para emprestimos de equipamentos
-- PostgreSQL | Execute em um banco de dados destinado a atividade.
-- As duas regras de negocio descritas no enunciado devem ser implementadas na API.

CREATE TABLE aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    turma VARCHAR(30) NOT NULL
);

CREATE TABLE equipamento (
    id_equipamento INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descricao VARCHAR(120) NOT NULL,
    patrimonio VARCHAR(30) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    fk_id_aluno INTEGER NOT NULL,
    fk_id_equipamento INTEGER NOT NULL,
    data_emprestimo TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_devolucao TIMESTAMP NULL,
    CONSTRAINT fk_emprestimo_aluno FOREIGN KEY (fk_id_aluno)
        REFERENCES aluno(id_aluno),
    CONSTRAINT fk_emprestimo_equipamento FOREIGN KEY (fk_id_equipamento)
        REFERENCES equipamento(id_equipamento),
    CONSTRAINT ck_devolucao_posterior CHECK (
        data_devolucao IS NULL OR data_devolucao >= data_emprestimo
    )
);

-- Dados iniciais para exercitar os endpoints.
INSERT INTO aluno (nome, email, turma) VALUES
('Ana Ribeiro', 'ana.ribeiro@exemplo.com', 'DS1'),
('Bruno Martins', 'bruno.martins@exemplo.com', 'DS1'),
('Carla Souza', 'carla.souza@exemplo.com', 'DS2');

INSERT INTO equipamento (descricao, patrimonio, tipo) VALUES
('Notebook Dell Latitude', 'PAT-001', 'Notebook'),
('Projetor Epson', 'PAT-002', 'Projetor'),
('Tablet Samsung', 'PAT-003', 'Tablet'),
('Notebook Lenovo', 'PAT-004', 'Notebook');

-- Registros com data_devolucao NULL representam emprestimos ativos.
-- Regra 1 (API): aluno pode ter no maximo 2 emprestimos ativos.
-- Regra 2 (API): equipamento nao pode ser emprestado se ja tiver emprestimo ativo.
-- As validacoes devem ser executadas no backend, preferencialmente dentro
-- de uma transacao para evitar conflitos entre requisicoes simultaneas.
