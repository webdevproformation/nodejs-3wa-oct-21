// fichier principal de notre application (api)
// npm init --yes
// npm i express mongoose dotenv bcrypt jsonwebtoken

const express = require("express"); 
const app = express(); 

require("./start/bdd")(); // charger la base de donnée
require("./start/routes")(app); // charger les routes de notre application

const PORT = process.env.PORT || 5200 ;

app.listen (PORT , () => console.log(`serveur démarré sur le port ${PORT}` ));
