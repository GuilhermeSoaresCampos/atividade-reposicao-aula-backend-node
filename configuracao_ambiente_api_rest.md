# Configuração do ambiente de desenvolvimento — API REST com Node.js e TypeScript

## Objetivo

Preparar um projeto backend utilizando **Node.js**, **TypeScript**, **Express** e **PostgreSQL**, compreendendo a finalidade de cada comando e a diferença entre dependências de produção e de desenvolvimento.

> **Pré-requisitos:** ter o Node.js e o npm instalados. Execute `node -v` e `npm -v` no terminal para conferir.

## 1. Inicialização do projeto

### `npm init -y`

```bash
npm init -y
```

Cria automaticamente o arquivo **`package.json`**, que registra as informações do projeto, suas dependências e os scripts de execução. A opção `-y` aceita os valores padrão sem fazer perguntas no terminal.

### `npm i -D typescript`

```bash
npm i -D typescript
```

Instala o compilador **TypeScript** como dependência de desenvolvimento (`-D` é o mesmo que `--save-dev`). Ele verifica os tipos e permite compilar arquivos `.ts` em JavaScript.

### `npx tsc --init`

```bash
npx tsc --init
```

Gera o arquivo **`tsconfig.json`**, responsável pelas configurações do compilador TypeScript. O comando `npx` executa o compilador instalado no projeto.

## 2. Bibliotecas necessárias para a API

### `npm install express`

```bash
npm install express
```

Instala o **Express**, framework usado para criar o servidor HTTP, definir rotas (como `GET`, `POST`, `PUT` e `DELETE`) e construir a API REST.

### `npm install cors`

```bash
npm install cors
```

Instala o middleware **CORS**, utilizado para configurar quais origens poderão acessar a API a partir de um navegador, por exemplo, quando o frontend e o backend estiverem em endereços diferentes.

## 3. Definições de tipos e ferramentas de desenvolvimento

### `npm i --save-dev @types/express`

```bash
npm i --save-dev @types/express
```

Adiciona as definições de tipos do Express, permitindo que o TypeScript reconheça objetos como `Request` e `Response`.

### `npm i --save-dev @types/cors`

```bash
npm i --save-dev @types/cors
```

Adiciona as definições de tipos da biblioteca CORS, permitindo sua utilização com verificação de tipos.

### `npm i --save-dev @types/node`

```bash
npm i --save-dev @types/node
```

Fornece os tipos das funcionalidades do Node.js, como `process`, módulos do sistema e outras APIs nativas.

### `npm i --save-dev ts-node`

```bash
npm i --save-dev ts-node
```

Permite executar arquivos TypeScript no ambiente de desenvolvimento sem precisar compilar manualmente antes de cada execução. Neste guia, será utilizado em conjunto com o Nodemon.

### `npm i --save-dev nodemon`

```bash
npm i --save-dev nodemon
```

Monitora alterações nos arquivos do projeto e reinicia automaticamente a aplicação durante o desenvolvimento.

## 4. Conexão com PostgreSQL e variáveis de ambiente

### Dependências utilizadas pela aplicação

```bash
npm i pg dotenv
```

- **`pg`**: biblioteca para conectar o Node.js ao banco de dados PostgreSQL e executar comandos SQL.
- **`dotenv`**: carrega variáveis definidas no arquivo `.env`, como host, porta, usuário e senha do banco.

Essas bibliotecas ficam em **`dependencies`**, pois são necessárias para executar a aplicação em produção.

### Tipos para desenvolvimento

```bash
npm i --save-dev @types/pg @types/dotenv
```

- **`@types/pg`**: disponibiliza as definições de tipos da biblioteca `pg`.
- **`@types/dotenv`**: pacote de tipos historicamente usado para `dotenv`. **Atenção:** versões atuais do `dotenv` já incluem suas próprias definições de tipos; portanto, `@types/dotenv` normalmente é desnecessário. O comando foi mantido para referência, mas pode ser dispensado.

> **Importante:** bibliotecas instaladas com `--save-dev` são registradas em **`devDependencies`**. Bibliotecas instaladas sem essa opção são registradas em **`dependencies`**.

## 5. Configuração obrigatória do `package.json`

**Não basta instalar os pacotes.** Confira e configure o arquivo `package.json` para executar a API no desenvolvimento e em produção.
## 6. Configuração obrigatória do `tsconfig.json`

**O arquivo gerado por `npx tsc --init` precisa ser revisado.** Para o projeto proposto, utilize uma configuração inicial. 


## 7. Faça o fork
**Realize o fork no seu GitHub, do fork realize o clone no seu ambiente de desenvolvimento, durante o desenvolvimento da aplicação realize commits para cada item desenvolvido** 