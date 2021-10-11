const { connect  } = require("mongoose");
const Utilisateur = require("./09-model-utilisateur");
require("dotenv").config();

connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );
// utiliser la collection utilisateur pour faire des requetes

// créer un fichier 09-model-utilisateur.js
// récupérer le code récupérer le schema  + modele qui est dans le fichier 06-exo.js
// module.exports = Utilisateur

// read => query récupérer une ou plusieurs informations dans une collection

async function getAllUtilisateur(){
   const listeUtilisateur = await  Utilisateur.find();
   // SELECT * FROM utilisateurs
   console.log(listeUtilisateur);
}

// getAllUtilisateur()

async function getAllUtilisateur2(){
    const listeUtilisateur = await Utilisateur.find()
                           // .select("nom -_id age")
                            .select({ nom : 1 , _id : 0 , age : 1 })
                            // 1 afficher
                            // 0 masquer

    // SELECT * FROM utilisateurs
    console.log(listeUtilisateur);
 }

// getAllUtilisateur2()

async function getAllUtilisateur3(){
    const listeUtilisateur = await Utilisateur.find({ nom : "John Doe" })
    
    // afficher uniquement 

    // SELECT * FROM utilisateurs WHERE nom = "John Doe"
    console.log(listeUtilisateur);
 }

//  getAllUtilisateur3() // [ {  } ] // []

 async function getAllUtilisateur4(){
    const premierUtilisateur = await Utilisateur.findOne({ nom : "John Doe" })
    
    // afficher uniquement 
    // SELECT * FROM utilisateurs WHERE nom = "John Doe"
    console.log(premierUtilisateur);
 }

 // getAllUtilisateur4()  // { } ou null

 // rechercher les utilisateurs qui ont entre 10 et 20 ans

 async function getAllUtilisateur5(){
    const where = { age : { $gt : 20 } };
    const premierUtilisateur = await Utilisateur.find(where);
    
    // afficher uniquement 
    // SELECT * FROM utilisateurs WHERE age > 10 AND age < 20
    console.log(premierUtilisateur);
 }

//  getAllUtilisateur5();

/**
    $eq : =
    $ne : != ou <>
    $gt : >
    $gte : >=
    $lt : <
    $lte : <=
    $in
    $nin : not in
 */

async function getAllUtilisateur6(){
    
    const premierUtilisateur = await Utilisateur.findOne()
                                                .limit(1);
    
    // afficher uniquement 
    // SELECT * FROM utilisateurs LIMIT 1
    console.log(premierUtilisateur);
}

// getAllUtilisateur6();

async function getAllUtilisateur7(){
    // recherche sur des éléments imbriqués 

    const premierUtilisateur = await Utilisateur.find({ "formation.intitule" : "BAC S"})
    
    // afficher uniquement 
    // sous requete
    // SELECT * FROM utilisateurs WHERE formation = 
    console.log(premierUtilisateur);
}

// getAllUtilisateur7()

// combien d'utilisateur 
// ont un age compris entre 10 et 20 ans

async function combien(){
    const where = {age : { $gt : 10 , $lt : 20 }};
    const nombre = await Utilisateur.count(where);
    console.log(nombre);
}

combien(); // 1

async function combienUniversite(){
    const where = {"formation.intitule" : "Université"};
    const nombre = await Utilisateur.count(where);
    console.log(nombre);
}

combienUniversite(); // 2

// 10-update.js