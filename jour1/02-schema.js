const mongoose = require("mongoose");

const urlBddMongoDB = "mongodb+srv://XXXXXXXXXXXXXXXXXXXXXXXX" ;
mongoose.connect( urlBddMongoDB , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );


// différentes possibilités pour créer des schemas de données 

// nouvelle collection dans jour1 => fiches
/* document dans cette table 

    titre : chaine de caractère 
    status : boolean
    date_creation : Date 
    sujets : tableau qui contient des chaines de caractères
    demandeur : objet 
                prenom 
                nom 
*/

const schemaFiche = new mongoose.Schema({
    titre : String ,
    status : Boolean ,
    date_creation : Date ,
    sujets : [String],
    demandeur : { 
        prenom : String,
        nom : String
    }
});

const fiche = {
    titre : "premier fiche",
    status : true,
    date_creation : new Date(),
    sujets : ["node", "angular", "react"],
    demandeur : {
        prenom : "Alain",
        nom : "Doe"
    }
}

const Fiche = mongoose.model( "fiches" ,schemaFiche  ); 

const creerFiche = new Fiche(fiche);

creerFiche.save()
          .then( (reponse) => {
              console.log(reponse)
          } )
          .catch( (erreur) => {
              console.log(new Error(erreur));
          })
/**

    String : chaine de caractère
    Number : nombre entier ou à virgule positif ou négatif
    Date : Date
    Buffer : stocker des données binaires (fichiers)
    Boolean : true / false
    Mixed : n'importe quoi
    ObjectId : identifiant unique
    Array : un tableau qui va pouvoir contenir []
    Array qui contient des objets [ { dt : Date , sujet :String } ]

cas pratique 
créer le fichier 03-exo.js
connecté à la base mongoDB / créer une nouvelle table exo1
qui contient des documents qui auront la forme suivante :

titre : texte 
contenu : texte 
point : chiffre 
sommaire : tableau de texte 
documentation : tableau objet 
          { id : ObjectId  , titre : string , url : string }


une fois créé le schema ajouter dans cette collection 1 enregistrement compatible avec le schema décrit

 */