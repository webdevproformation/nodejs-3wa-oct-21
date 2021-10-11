const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );

// récupérer toutes les variables d'environnement

const PORT = process.env.PORT || 2000; 

/* console.log(PORT);
console.log(process.env.PORT); */

const testSchema = new mongoose.Schema({
    titre : String ,
    like : Number,
    commentaire : [],
    info : Number
});

let test = {
    // titre : "autre test", // vérification sur le type données envoyées
    // like : 22, // vérification sur le type données envoyées MAIS facultative 
    inconnue : "information non présente dans le schema" ,// n'est ajouté dans l'enregistrement
    // absent du schema 
    titre : "effectuer un test avec mongoose",
    like : 30
};

let Test = mongoose.model( "tests" , testSchema );

// syntaxe avec des Promises
(new Test(test)).save() 
// si la base n'existe pas => crééé
// si la collection n'est pas => crééer aussi
// ajouter le document 
// INSERT INTO test ("inconnue") values ("toto")
                .then( (response) => { console.log(response) } )
                .catch( (erreur) => { console.log(erreur) } )

// mongoDB => table test 
// ET chaque enregistrement peut avoir une structure différente 

/**
 * // enregistrement 1
{
    titre : "",
    like : 2
}
 * // enregistrement 2
{
   commentaire : ["toto", "titi"],
   info : 2
}
objetjs ORM : Object Relationnal Mapping => mongoose schema => MongoDB 
 */

// 05-schema-validation.js

