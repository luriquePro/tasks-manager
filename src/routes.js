const { Router } = require("express");

const Routes = Router();

Routes.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = Routes;
