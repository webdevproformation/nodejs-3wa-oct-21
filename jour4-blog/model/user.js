const { Schema , model } = require("mongoose");

const schemaUser = new Schema({
    login : {type : String , required : true},
    password : {type : String , required : true} 
});

module.exports =  User = model("users", schemaUser) ;
