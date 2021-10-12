const {connect , Types} = require("mongoose");
const Utilisateur = require("./01-model");
require("dotenv").config();

connect( process.env.BD , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })

async function creerUtilisateur(){
    try{
        const user = {
            nom : "Alain",
            age : 22,
            profession : "Professeur des Ecoles"
        }
        const creer = new Utilisateur(user);
        const resultat = await creer.save()
        console.log(resultat)
    }catch(erreur){
        for(let item in erreur.errors){
            console.log(erreur.errors[item].message)
        }
    }
}
// creerUtilisateur()

// cas pratique => modifier un utilisateur actuellement stockée en base de données jour2
// modifier age et nom 
// 32 
// nom Béatrice

async function modifierUtilisateur(id){
    // vérifier est ce que l'id donné est ObjectId correct 
    if(!Types.ObjectId.isValid(id)){
        return console.log("id incorrect");
    }
    // try // catch
    try{
        // recherché l'utilisateur dans la balise => référence 
        const utilisateurAModifier =  await Utilisateur.findOne({ _id : id });
                                            //Utilisateur.findById(id)
        if(!utilisateurAModifier){
            return console.log("utiliser n'existe pas");
        }
        // effectuer les modifier sur la référence 
        utilisateurAModifier.age = 32;
        utilisateurAModifier.nom = "Béatrice";
        // enregistrement
        const resultat = await utilisateurAModifier.save()
        console.log(resultat);
    }catch(erreur){
        for(let item in erreur.errors){
            console.log(erreur.errors[item].message)
        }
    }
}
modifierUtilisateur("61653fef75f67b2101bdd956")