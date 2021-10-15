const { Schema } = require("mongoose");

const schemaCommentaire = new Schema({
    email : {type : String , required : true}, 
    commentaire : {type : String , required : true}
})

module.exports = schemaCommentaire ; 
