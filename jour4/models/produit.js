const {Schema , model , Types} = require("mongoose");

const schemaProduit = new Schema({
    nom  : {
        type : String,
        required : true ,
        minlength : 5
    },
    prix :{
        type: Number,
        required: true,
        min : 0
    },
    auteur : {
        type : Types.ObjectId,
        ref : "users"
    }
});

const Produit = model("produits" , schemaProduit); 

module.exports = Produit ; 