# Gerenciador de Tarefas

Este projeto é uma API simples para gerenciamento de tarefas utilizando Node.js e Express. Ele permite adicionar, listar e excluir tarefas armazenadas em um arquivo JSON.

## Tecnologias Utilizadas

- Node.js
- Express
- fs (Sistema de Arquivos do Node.js)

## Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/luriquePro/tasks-manager.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd tasks-manager
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Uso

### Iniciando o Servidor

Para iniciar o servidor, execute:

```sh
npm run start
```

Por padrão, o servidor estará rodando na porta 3000.

### Rotas Disponíveis

#### Adicionar uma tarefa

```sh
GET /add?title={titulo}&description={descricao}&is_done={true|false}
```

**Parâmetros:**

- `title` (string, obrigatório): título da tarefa
- `description` (string, obrigatório): descrição da tarefa
- `is_done` (boolean, opcional): indica se a tarefa está concluída (padrão: `false`)

**Exemplo de uso:**

```sh
GET /add?title=Estudar&description=Revisar POO&is_done=false
```

#### Listar tarefas

```sh
GET /list?sort={done|title|createdAt}&type={asc|desc}
```

**Parâmetros:**

- `sort` (string, opcional): define o critério de ordenação (`done`, `title` ou `createdAt`)
- `type` (string, opcional): define a ordem de ordenação (`asc` ou `desc`)

**Exemplo de uso:**

```sh
GET /list?sort=title&type=asc
```

#### Excluir uma tarefa

```sh
GET /delete/{id}
```

**Parâmetros:**

- `id` (número, obrigatório): ID da tarefa a ser excluída

**Exemplo de uso:**

```sh
GET /delete/1
```

#### Concluir uma tarefa

```sh
GET /done/{id}
```

**Parâmetros:**

- `id` (número, obrigatório): ID da tarefa a ser concluida

**Exemplo de uso:**

```sh
GET /done/1
```

## Estrutura do Projeto

```
├── config.js
├── server.js
├── usecase.js
├── routes.js
└── tasks.json
```

## Validações

- `title` e `description` são obrigatórios para adicionar uma tarefa.
- O `id` informado para `exclusão e/ou conclusão` deve ser um número válido.
- Os valores aceitos para ordenação são `asc` e `desc`.

## Requisições

[Clique aqui para ver todos os exemplos de requisições](./task-api-curl-requests.md)

## Licença

Este projeto é de código aberto e pode ser utilizado livremente.
