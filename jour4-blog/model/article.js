const {Schema, model} = require("mongoose");
const schemaCommentaire = require("./commentaire");

const schemaArticle = new Schema({
    titre : {type : String , required : [true , "le titre est obligatoire"]},
    contenu : {type : String , required : [true , "le contenu est obligatoire"]},
    dt_creation : { type : Date , default : Date.now },
    commentaires : [ schemaCommentaire ]
    // modèle collection intégré 
    // on stocke dans les documents articles
    // les commentaires associés
});

module.exports = Article = model("articles", schemaArticle)