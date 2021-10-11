const mongoose = require("mongoose");

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

module.exports = Utilisateur ; 