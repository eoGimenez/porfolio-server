require("dotenv").config();
require("./db");
const express = require("express")

const app = express();
require("./config")(app);

const projectRoutes = require("./routes/project.routes");
app.use("/api/projects", projectRoutes);

module.exports = app;