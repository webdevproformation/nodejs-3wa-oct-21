// npm init --yes
// npm i dotenv mongoose
const {Schema , model} = require("mongoose");

const schemaUtilisateur = Schema({ 
    nom : String,
    age : Number,
    profession : String
});

const Utilisateur = model("utilisateurs", schemaUtilisateur );

module.exports = Utilisateur; // find() .save() count() findById
