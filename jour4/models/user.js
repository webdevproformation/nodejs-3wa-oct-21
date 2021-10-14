const {Schema , model} = require("mongoose");
const jwt = require("jsonwebtoken")

const schemaUser = new Schema({
    email : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin", "redacteur"]
    },
})
schemaUser.methods.genererJWT = function(){
    const profil = {
        _id : this.id ,
        email : this.email ,
        role : this.role
    }
    const token = jwt.sign(profil , process.env.SECRET_JWT)
    return token ; 
}

const User = model("users" , schemaUser); 

module.exports = User ; 