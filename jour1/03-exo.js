const mongoose = require("mongoose");

const urlBddMongoDB = "mongodb+srv://XXXXXXXXXXXXXXXXXXXXXXXX" ;
mongoose.connect( urlBddMongoDB , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );

const schemaExo1 = new mongoose.Schema({
    titre : String ,
    contenu : String , 
    point : Number , 
    sommaire : [String],
    documentation : [
        { 
            id : mongoose.Schema.Types.ObjectId ,
            titre : String,
            url : String
        }
    ]
});

const exo = {
    titre : "exo 1" ,
    contenu : "lorem ipsum" , 
    point : 10 , 
    sommaire : ["js", "ajax" , "node"],
    documentation : [
        { 
            id : new mongoose.Types.ObjectId, // id unique de MongoDB
            titre : "information 1",
            url : "http://exo.html"
        }
    ]
};

const Exo1 = mongoose.model( "exo1", schemaExo1 );

const creerExo1 = new Exo1( exo );
creerExo1.save()
         .then( (resultat) => {
            console.log(resultat)
         })
         .catch((erreur) => {
            console.log(new Error(erreur))
         })

// fichier .env dans le dossier jour1

// npm i dotenv
// créer un nouveau fichier 04-env.js
