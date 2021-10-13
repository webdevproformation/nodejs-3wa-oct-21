// cd jour3
// npm init --yes package.json
// npm i express mongoose dotenv joi

const express = require("express");
const app = express();

require("./demarrage/bdd")(); // se connecter à la base de données
require("./demarrage/routes")(app) // charger les routes express 

const PORT = process.env.PORT || 5232;
app.listen( PORT , () => console.log(`serveur express est démarré sur le port ${PORT}`))

// http://localhost:5232/ GET

// 02-authentification.js