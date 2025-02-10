const express = require("express");

const application = express();

application.use(express.json());
application.use(require("./routes"));

exports.application = application;
