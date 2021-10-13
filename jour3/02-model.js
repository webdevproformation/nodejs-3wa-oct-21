const {Schema, model } = require("mongoose")
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

const User = model( "users" , schemaUser);

module.exports = User; 