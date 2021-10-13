// cd jour3
// npm init --yes package.json
// npm i express mongoose dotenv

const express = require("express");
const routerUtilisateur = require("./routes/utilisateur");
const erreur500 = require("./middleware/erreur500");
const { connect } = require("mongoose");
require("dotenv").config();

connect( process.env.BDD , {useNewUrlParser : true})
    .then( () => console.log("connexion à la base réussie"))
    .catch(ex  => console.log(new Error(ex)))

const app = express();

// middleware globale 
// ajouter à express un comportement lorsqu'il reçoit requête  
app.use("/" , routerUtilisateur);
app.use(erreur500); // à la suite des routes 


const PORT = process.env.PORT || 5232;
app.listen( PORT , () => console.log(`serveur express est démarré sur le port ${PORT}`))

// http://localhost:5232/ GET