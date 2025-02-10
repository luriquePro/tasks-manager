const { Router } = require("express");
const { addTask } = require("./usecase");

const Routes = Router();

Routes.get("/add", (req, res) => {
  const { title, description, is_done } = req.query;
  const result = addTask({ title, description, is_done});

  if (result.error) {
    return res.status(400).json({ message: result.message });
  }

  return res.json(result);
});

module.exports = Routes;
