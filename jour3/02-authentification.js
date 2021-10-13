const express = require("express");
const route = require("./02-route"); // fichier en charge des routes express
const connexion = require("./02-connexion"); // fichier en charge des routes express
const utilisateur = require("./02-gestion-utilisateurs"); // fichier en charge des routes express

require("./02-bdd")(); // connexion à la base de données 

const app = express();

app.use("/", route); // créer un profil 
app.use("/", connexion);  // saisir son login et mot de passe 
app.use("/", utilisateur);  // saisir son login et mot de passe 

const PORT = process.env.PORT || 5600;

app.listen(PORT , console.log(`serveur express démarré sur le port ${PORT}`));
