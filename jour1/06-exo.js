const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );

const schemaUtilisateur = new mongoose.Schema({
    nom : {
        type : String,
        required: true,
        minlength : 3
    },
    age : {
        type : Number ,
        required: true,
        min : 0 ,
        max: 100
    },
    formation : [
        { 
            intitule : {
                type : String,
                required: true
            },
            dt_arrivee : {
                type : Date ,
                default : Date.now
            }
        }
    ],
    estEnformation : Boolean
});

const Utilisateur = mongoose.model("utilisateurs", schemaUtilisateur);

const creerUtilisateur = async () => {
    try{
        const etudiant = {
            nom : "John Doe",
            age : 32 ,
            formation : [
                {  intitule : "BAC S" , dt_arrivee : new Date(2011, 0, 1) },
                // 1er janvier 2011 
                {  intitule : "Université"  },
            ]
        };
    
        const creer = new Utilisateur(etudiant)
        const resultat = await creer.save();
        console.log(resultat);
    }catch(erreur){
        console.log(new Error(erreur))
    }
}

creerUtilisateur();

// 07-schema-validation-personnalise.js