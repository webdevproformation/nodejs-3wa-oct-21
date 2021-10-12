const {connect , Types} = require("mongoose");
const Commentaire = require("./03-model");
require("dotenv").config();
connect( process.env.URLBDD , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })
const supprCommentaire = async (id) => {
    if(!Types.ObjectId.isValid(id)){
        return console.log("id incorrect")
    }
    try{
       const resultat = await Commentaire.findByIdAndRemove(id);
       if(resultat){
        return console.log("commentaire bien supprimé");
       }
       return console.log("commentaire n'existe pas");
    }catch(erreur){
        for(let field in erreur.errors){
            console.log(erreur.errors[field].message)
        }
    }
}
supprCommentaire("616436340750e1f1ef4202e8");
