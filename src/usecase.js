// Libs Internas
const fs = require("fs");
const path = require("path");

// Arquivos Internos
const { FILE_NAME, EXTENSION } = require("./config");

module.exports.addTask = ({ title, description, is_done = false }) => {
  // Validar a task
  const validResult = validArgsToAddNewTask({ title, description });
  if (validResult.error) return validResult;

  // Checar se já existe uma tarefa com esse titulo
  const tasks = loadTasks();

  // Buscar se a task existe
  const taskAlreadyExists = tasks.some(({ title: taskTittle }) => taskTittle.toLowerCase() === title.toLowerCase());
  if (taskAlreadyExists) {
    return {
      error: true,
      message: "Essa tarefa já foi cadastrada"
    };
  }

  if (is_done !== false && is_done === "true") is_done = true;

  // Adicionar a lista
  tasks.push({ title, description, is_done });

  // Atualizar os dados
  saveTasks(tasks);

  return {
    error: false,
    message: `A tarefa: ${title}. Foi adicionada com sucesso.`
  };
};

module.exports.listTasks = ({ sort = "done", type = "asc" }) => {
  const validResult = validArgsToSortTasks({ sort, type });
  if (validResult.error) return validResult;

  const rawTasks = loadTasks();
  const rawTasksWithId = rawTasks.map((task, index) => ({ ...task, id: index + 1 }));

  const sortedTasks = sortTasks({ tasks: rawTasksWithId, sort, type });

  return { error: false, tasks: sortedTasks };
};

module.exports.deleteTask = ({ id }) => {
  // validar o id
  const validResult = validArgsToDeleteTaskOrDone({ id });
  if (validResult.error) return validResult;

  const tasks = loadTasks();
  const taskExists = tasks[Number(id) - 1];
  if (!taskExists) {
    return {
      error: true,
      message: "Essa tarefa não existe"
    };
  }

  // Remover a tarefa
  tasks.splice(Number(id) - 1, 1);

  // Atualizar os dados
  saveTasks(tasks);

  return {
    error: false,
    message: `A tarefa: ${taskExists.title}. Foi removida com sucesso.`
  };
};

module.exports.changeTaskToDone = ({ id }) => {
  // validar o id
  const validResult = validArgsToDeleteTaskOrDone({ id });
  if (validResult.error) return validResult;

  // Pegar todas as tasks
  const tasks = loadTasks();

  // Buscar a task escolhida
  const selectedTask = tasks[Number(id) - 1];
  if (!selectedTask) {
    return {
      error: true,
      message: "Informe um 'ID' Válido."
    };
  }

  // Alterar para Done true
  tasks[Number(id) - 1].is_done = true;

  // Atualizar as Tasks
  saveTasks(tasks);

  return { error: false, message: `A tarefa: ${selectedTask.title} foi concluida com sucesso` };
};

const validArgsToAddNewTask = ({ title, description }) => {
  if (!title || !description) {
    return {
      error: true,
      message: "O titulo e a descrição da Tarefa são obrigatorios"
    };
  }

  return { error: false };
};

const loadTasks = () => {
  const filePath = getTasksPath();
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch ({ code: errorCode }) {
    // Erro causado pelo arquivo não existir
    if (errorCode === "ENOENT") {
      // Criar arquivo
      saveTasks([], filePath);

      // Retornar a propria função
      return loadTasks();
    }
  }
};

const getTasksPath = () => path.join(__dirname, FILE_NAME + EXTENSION);

const saveTasks = (tasks, path) => {
  const filePath = path ?? getTasksPath();

  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.log(error);
  }
};

const validArgsToSortTasks = ({ sort, type }) => {
  const validParams = new Set(["asc", "desc"]);

  const validSort = new Set(["done", "title", "createdAt"]);

  // Validar se os parametros são asc ou desc
  if (!validParams.has(type)) {
    return { error: true, message: "Os valores aceitados para ordenamento são somente 'asc' ou 'desc'" };
  }

  if (!validSort.has(sort)) {
    return { error: true, message: "Os valores aceitados para ordenamento são somente 'done', 'title' ou 'createdAt'" };
  }

  return { error: false };
};

const sortTasks = ({ tasks, sort, type }) => {
  if (sort === "done") {
    if (type === "asc") return tasks.sort((a, b) => a.is_done - b.is_done);
    return tasks.sort((a, b) => b.is_done - a.is_done);
  }

  if (sort === "title") {
    if (type === "asc") return tasks.sort((a, b) => a.title.localeCompare(b.title));
    return tasks.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (sort === "createdAt") {
    if (type === "asc") return tasks.sort((a, b) => a.id - b.id);
    return tasks.sort((a, b) => b.id - a.id);
  }
};

const validArgsToDeleteTaskOrDone = ({ id }) => {
  if (!id) return { error: true, message: "O id da tarefa precisa ser informado" };
  if (isNaN(id)) return { error: true, message: "O id da tarefa precisa ser um numero" };
  return { error: false };
};
