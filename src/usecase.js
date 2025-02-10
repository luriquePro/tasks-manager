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
