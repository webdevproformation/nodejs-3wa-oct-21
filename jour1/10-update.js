const { connect  } = require("mongoose");
const Utilisateur = require("./09-model-utilisateur");
require("dotenv").config();

connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );


// modifier la valeur stockée sur un utilisateur

// 2 manières de faire
// QueryFirst 

// UpdateFirst
