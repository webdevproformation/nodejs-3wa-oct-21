const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );


const validationSchema = new mongoose.Schema({
    titre : { 
        type: String ,
        required : true // il faut OBLIGATOIREMENT que l'objet à enregistrer doit contenir le champ titre
    },
    like : {
        type : Number ,
        min : 0  // minimum la valeur 0
    },
    categorie : {
        type : String ,
        enum: ["nodejs", "angular" , "typescript"] 
    },
    date : {
        type : Date ,
        default : Date.now // dès qu'il y a un save => mongoose => mongoDB donner la valeur maintenant par défaut 
    }
})

const validation = {
    titre : "un titre",
    categorie : "angular"/* ,
    date : new Date(2020, 1, 1) */
}
const Validation = mongoose.model( "validations", validationSchema );
// Promises then() catch()
// await / async 

async function creerValidation(){
    try{
        const creer = new Validation(validation);
        const resultat = await creer.save();
        console.log(resultat)
    }catch(erreur){
        console.log(erreur)
    }
}

creerValidation();

// bon appétit rdv 14h00 @ toute suite !!!!

// créer le fichier 06-exo.js 
// connection à la base mongo 
// schema 
// utilisateur 
//  nom : texte / obligatoire / contenir minimum 3 lettres
//  age : chiffre / obligatoire / supérieur 0 et maximum 100
//  formation : tableau  contenir des objets
//              { intitule : texte / obligatoire , dt_arrivee : date par défaut aujourd'hui}
//  estEnformation : boolean facultatif 

// une fois créer le schéma et le module ajouter un nouveau document dans la table utilisateurs