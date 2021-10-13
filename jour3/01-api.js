// cd jour3
// npm init --yes package.json
// npm i express mongoose dotenv

const express = require("express");

require("./demarrage/bdd")();
const app = express();
require("./demarrage/routes")(app)

const PORT = process.env.PORT || 5232;
app.listen( PORT , () => console.log(`serveur express est démarré sur le port ${PORT}`))

// http://localhost:5232/ GET