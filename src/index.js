const express = require("express");

const routes = require("./routes");
const configExpress = require("./config/configExpress");
const configHandlebars = require("./config/configHandlebars");

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

app.use(routes);

app.listen(port, () => console.log("Server is listening on port 3000..."));