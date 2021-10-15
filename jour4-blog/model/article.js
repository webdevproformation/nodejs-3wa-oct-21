const {Schema, model} = require("mongoose");

const schemaArticle = new Schema({
    titre : {type : String , required : [true , "le titre est obligatoire"]},
    contenu : {type : String , required : [true , "le contenu est obligatoire"]},
    dt_creation : { type : Date , default : Date.now }
});

module.exports = Article = model("articles", schemaArticle)