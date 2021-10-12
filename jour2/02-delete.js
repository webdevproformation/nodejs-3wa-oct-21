const {connect , Types} = require("mongoose");
const Utilisateur = require("./01-model");
require("dotenv").config();

connect( process.env.BD , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })

// supprimer un Enregistrement dans votre collection 
// Utilisateur.deleteOne({_id : id})
// Utilisateur.findByIdAndRemove({_id : id})
// Utilisateur.findByIdAndRemove(id)

// supprimer tous les Enregistrements dans votre collection qui respectent le critère demandé 
// Utilisateur.deleteMany({ profession : "test"})

async function supprUtilisateur(id){
    // vérifier est ce que l'id donné est ObjectId correct 
    if(!Types.ObjectId.isValid(id)){
        return console.log("id incorrect");
    }
    try{
        const resultat = await Utilisateur.findByIdAndRemove(id);
        if(resultat){
           return console.log("utilisateur a bien été supprimé");
        }
        return console.log("utilisateur n'existe pas la base")
    }catch(erreur){
        for(let item in erreur.errors){
            console.log(erreur.errors[item].message)
        }
    }
}
supprUtilisateur("61653fb63c1823d4a8f0c008");

// cas pratique créer le fichier 03-exo.js
// supprimer dans la base jour1 dans la collection commentaires
// 1 enregistrement  de votre choix 

// rdv 11h15 @ toute !! bon café !!
// correction
// SQL => jointure 
// NoSQL => plusieurs manières de gérer ce cas de figure
