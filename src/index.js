const express = require("express");

const configExpress = require("./config/configExpress");
const configHandlebars = require("./config/configHandlebars");

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

app.get("/", (req, res) => {
    res.status(200).write("<h1>Hello</h1>");
});

app.listen(port, () => console.log("Server is listening on port 3000..."));