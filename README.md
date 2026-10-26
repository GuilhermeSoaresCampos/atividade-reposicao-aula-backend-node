# API REST — Empréstimo de Equipamentos

API REST desenvolvida para gerenciar alunos, equipamentos e empréstimos de equipamentos, utilizando Node.js, TypeScript, Express e PostgreSQL.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Git e GitHub

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/jmr230584/atividade-reposicao-aula-backend-node.git
cd atividade-reposicao-aula-backend-node
```

Instale as dependências:

```bash
npm install
```

## Configuração do banco de dados

1. Crie o banco de dados `reposicao-aula` no PostgreSQL.
2. Abra o pgAdmin 4 e execute o arquivo `infra/init.sql` no banco criado.
3. Crie um arquivo `.env` na raiz do projeto, com as seguintes configurações:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=reposicao-aula
DB_PASSWORD=admin
DB_PORT=5432

PORT=3333
```

Ajuste os valores conforme a configuração do PostgreSQL instalado no computador.

**Importante:** o arquivo `.env` não deve ser enviado ao GitHub, pois contém credenciais de acesso ao banco de dados.

## Execução da API

Para iniciar o backend, execute:

```bash
npx nodemon
```

A API utiliza a porta `3333` e pode ser acessada em:

`http://localhost:3333`

## Endpoints

| Método | Endpoint                        | Funcionalidade        |
| ------ | ------------------------------- | --------------------- |
| GET    | `/api/aluno`                    | Listar alunos         |
| POST   | `/api/alunos`                   | Cadastrar aluno       |
| PUT    | `/api/alunos/:id`               | Atualizar aluno       |
| DELETE | `/api/alunos/:id`               | Excluir aluno         |
| GET    | `/api/equipamento`              | Listar equipamentos   |
| POST   | `/api/equipamentos`             | Cadastrar equipamento |
| PUT    | `/api/equipamentos/:id`         | Atualizar equipamento |
| DELETE | `/api/equipamentos/:id`         | Excluir equipamento   |
| GET    | `/api/emprestimo`               | Listar empréstimos    |
| POST   | `/api/emprestimo`               | Registrar empréstimo  |
| PUT    | `/api/emprestimo/:id/devolucao` | Registrar devolução   |

## Regras de negócio

- **RN01:** cada aluno pode ter, no máximo, dois empréstimos ativos simultaneamente.
- **RN02:** um equipamento com empréstimo ativo não pode ser emprestado novamente antes da devolução.

## Testes

Os endpoints podem ser testados pelo Postman, verificando as respostas HTTP e os dados retornados.

Também devem ser realizados testes para comprovar que as duas regras de negócio são respeitadas.

## Arquivos complementares

O repositório deve conter o arquivo `infra/init.sql`, o diagrama de classes e as evidências dos testes, conforme solicitado na atividade.
