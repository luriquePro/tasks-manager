# Documentação de Requisições da API de Gerenciamento de Tarefas

Este documento lista todas as requisições disponíveis na API, juntamente com exemplos de uso utilizando `curl`.

## 1. Adicionar uma Tarefa

**Endpoint:** `GET /add`

**Parâmetros:**

- `title` (string) - Título da tarefa (obrigatório)
- `description` (string) - Descrição da tarefa (obrigatório)
- `is_done` (boolean) - Define se a tarefa já está concluída (opcional, padrão: false)

**Exemplo de Requisição:**

```sh
curl -X GET "http://localhost:3000/add?title=Estudar&description=Revisar%20NodeJS"
```

**Resposta Esperada:**

- Sucesso:

```json
{
  "error": false,
  "message": "A tarefa: Tarefa1. Foi adicionada com sucesso."
}
```

- Erro de validação:

```json
{
  "error": true,
  "message": "O titulo e a descrição da Tarefa são obrigatorios"
}
```

## 2. Listar Tarefas

**Endpoint:** `GET /list`

**Parâmetros:**

- `sort` (string) - Campo de ordenação (`done`, `title`, `createdAt`)
- `type` (string) - Tipo de ordenação (`asc` ou `desc`)

**Exemplo de Requisição:**

```sh
curl -X GET "http://localhost:3000/list?sort=title&type=asc"
```

**Resposta Esperada:**

- Sucesso:

```json
{
  "tasks": [
    {
      "title": "Tarefa1",
      "description": "Descricao1",
      "is_done": false,
      "id": 1
    }
  ]
}
```

- Erro de validação:

```json
{
  "error": true,
  "message": "Os valores aceitados para ordenamento são somente 'asc' ou 'desc'"
}
```

## 3. Deletar uma Tarefa

**Endpoint:** `GET /delete/:id`

**Parâmetros:**

- `id` (number) - ID da tarefa a ser removida (obrigatório)

**Exemplo de Requisição:**

```sh
curl -X GET "http://localhost:3000/delete/1"
```

**Resposta Esperada:**

- Sucesso:

### Resposta Esperada:

```json
{
  "error": false,
  "message": "A tarefa: Tarefa1. Foi removida com sucesso."
}
```

- Erro de validação:

```json
{
  "error": true,
  "message": "Informe um 'ID' válido."
}
```

## 4. Marcar uma Tarefa como Concluída

**Endpoint:** `GET /done/:id`

**Parâmetros:**

- `id` (number) - ID da tarefa a ser marcada como concluída (obrigatório)

**Exemplo de Requisição:**

```sh
curl -X GET "http://localhost:3000/done/1"
```

**Resposta Esperada:**

- Sucesso:

```json
{
  "error": false,
  "message": "A tarefa: Tarefa1 foi concluída com sucesso."
}
```

- Erro de validação:

```json
{
  "error": true,
  "message": "Informe um 'ID' válido."
}
```

## Observações

- A API utiliza arquivos JSON para armazenar os dados das tarefas.
- Todas as requisições são feitas utilizando o método `GET`.
- Certifique-se de que o servidor está rodando na porta correta antes de realizar as requisições.

---
