const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");
const configExpress = require("./config/configExpress");
const configHandlebars = require("./config/configHandlebars");

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

app.use(routes);

const connectionString = "mongodb://localhost:27017/earth-treasure-vaul";
mongoose.connect(connectionString)
    .then(() => {
        console.log("DB connected");
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => console.log(`DB connection error -> ${err}`));