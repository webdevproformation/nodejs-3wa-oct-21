const { Schema, model } = require("mongoose")
const jwt = require("jsonwebtoken");
require("dotenv").config();
// schema 
// table dans la base de données => user 
//  / 
// login String obligatoire min 5 
// passeport  String obligatoire min 5 
// créer un model user 
// dans le fichier encours 
const schemaUser = new Schema({
    login : {
        type: String,
        required : true,
        minlength : 5
    },
    password : {
        type: String,
        required : true,
        minlength : 5
    }
});

schemaUser.methods.generateToken = function ()  {
    const profil = {
        login : this.login 
    }
    const token = jwt.sign ( profil , process.env.SECRET ); // jwt.sign  {} => "jsonwebtoken"
    return token ; 
}

const User = model( "users" , schemaUser);

module.exports = User; 