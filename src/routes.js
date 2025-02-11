const { Router } = require("express");
const { addTask, listTasks, deleteTask, changeTaskToDone } = require("./usecase");

const Routes = Router();

Routes.get("/add", (req, res) => {
  const { title, description, is_done } = req.query;
  const result = addTask({ title, description, is_done });

  if (result.error) {
    return res.status(400).json({ message: result.message });
  }

  return res.json(result);
});

Routes.get("/list", (req, res) => {
  const { sort, type } = req.query;

  const result = listTasks({ sort, type });

  if (result.error) {
    return res.status(400).json({ message: result.message });
  }

  return res.json({ tasks: result.tasks });
});

Routes.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  const result = deleteTask({ id });

  if (result.error) {
    return res.status(400).json({ message: result.message });
  }

  return res.json(result);
});

Routes.get("/done/:id", (req, res) => {
  const { id } = req.params;
  const result = changeTaskToDone({ id });

  if (result.error) {
    return res.status(400).json({ message: result.message });
  }

  return res.json(result);
});

module.exports = Routes;
