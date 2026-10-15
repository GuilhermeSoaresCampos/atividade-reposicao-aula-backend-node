# ATIVIDADE DE REPOSIÇÃO DE AULAS

*Desenvolvimento de API REST • Diagrama de Classes • Git e GitHub*

Carga horária a compensar: 8 aulas | Modalidade: atividade prática individual

## 1. Situação-problema

Uma instituição de ensino precisa organizar o empréstimo de equipamentos utilizados em atividades pedagógicas. Atualmente, o registro é feito manualmente, dificultando a identificação de quais equipamentos estão emprestados e quem são os responsáveis por sua retirada. A instituição solicitou o desenvolvimento de uma API REST que permita cadastrar alunos e equipamentos e controlar a retirada e a devolução dos itens.

O sistema trabalhará com apenas três entidades: Aluno (nome, e-mail e turma), Equipamento (descrição, patrimônio e tipo) e Empréstimo (aluno, equipamento, data do empréstimo e data da devolução). Cada empréstimo deve estar relacionado a um aluno e a um equipamento.

## 2. Regras de negócio

RN01 — Um aluno poderá manter, no máximo, dois empréstimos ativos simultaneamente.

RN02 — Um equipamento com empréstimo ativo não poderá ser emprestado novamente até que sua devolução seja registrada.

Considera-se ativo o empréstimo cuja data de devolução ainda não foi registrada. As duas regras devem ser validadas pelo backend, com respostas HTTP adequadas quando uma operação não puder ser realizada.

## 3. O que deve ser desenvolvido

- Criar uma API REST que utilize PostgreSQL e o banco disponibilizado no arquivo init.sql.
- Implementar operações para cadastrar, consultar, atualizar e excluir alunos e equipamentos, respeitando os vínculos existentes.
- Implementar o registro de empréstimos, a consulta de empréstimos e o registro de devoluções; distinguir empréstimos ativos dos finalizados.
- Aplicar as duas regras de negócio descritas no contexto e retornar códigos HTTP coerentes (por exemplo: 200, 201, 400, 404 e 409).
- Organizar o código em responsabilidades claras (por exemplo, rotas/controllers, services e acesso a dados), usando nomes significativos, funções objetivas e princípios de Clean Code.
- Elaborar um diagrama de classes com as três entidades, seus atributos principais, associações e multiplicidades.
- Versionar o código do backend com Git e disponibilizá-lo em um repositório no GitHub, com commits que demonstrem a evolução da implementação.
## 4. Entregas obrigatórias

- Link do repositório público do GitHub contendo todo o código-fonte do backend, com histórico de commits.
- Arquivo README.md explicando como instalar dependências, configurar a conexão com o PostgreSQL, executar a API e testar seus endpoints.
- Diagrama de classes em PDF ou imagem, incluído no repositório.
- Arquivo init.sql no repositório (o mesmo fornecido com a atividade).
- Evidências de testes dos endpoints e das duas regras de negócio (capturas de tela ou coleção de requisições, acompanhadas dos resultados esperados/obtidos).
## 5. Orientações

O arquivo init.sql fornece a estrutura inicial das três tabelas e alguns registros de exemplo. Não é necessário criar novas entidades. As regras de negócio devem ser implementadas na aplicação e demonstradas nos testes. Utilize variáveis de ambiente para credenciais e não publique senhas ou arquivos .env no GitHub.

A atividade será considerada entregue mediante o compartilhamento do link do repositório e a presença dos demais itens solicitados.
