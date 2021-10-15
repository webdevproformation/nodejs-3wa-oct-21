const { Schema , model } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const schemaUser = new Schema({
    login : {type : String , required : true},
    password : {type : String , required : true} 
});

schemaUser.methods.genererJWT = function(){
    const profil = {
        _id = this._id,
        login : this.login
    }
    return jwt.sign(profil , process.env.JWT_SECRET)
    // npm i jsonwebtoken

}

module.exports =  User = model("users", schemaUser) ;
