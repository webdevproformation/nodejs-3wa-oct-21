const { Schema , model} = require("mongoose");

const utilisateurSchema = new Schema({
    titre : String ,
    contenu : String ,
    date : {
        type : Date ,
        default : Date.now
    }
});

const Utilisateur = model( "utilisateurs" , utilisateurSchema );

module.exports = Utilisateur ; 