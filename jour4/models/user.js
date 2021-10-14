const {Schema , model} = require("mongoose");

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

const User = model("users" , schemaUser); 

module.exports = User ; 