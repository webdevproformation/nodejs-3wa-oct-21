const mongoose = require("mongoose");

const schemaCommentaire = new mongoose.Schema({
    titre : String,
    auteurs : {
        type : Array ,
        validate : {
            validator : ( valeurs ) => {
                // retourner un boolean true => validation ok
                // ko => false => validation n'est pas passée 
                const verif = valeurs && valeurs.length > 0
                return verif;
            }
        }
    },
    categorie : {
        type : String ,
        required : true ,
        validate : {
            validator : ( valeurs ) => {
                return new Promise( (resolve , reject) => {
                    setTimeout( ()=> {
                        const categories = ["node","angular", "js"]
                        const verif = categories.includes(valeurs);
                        if(verif){
                           return resolve(true)
                        }
                        reject(false);
                    } , 5000)
                } )
            }
        }
    }
})
// https://mongoosejs.com/docs/validation.html liste des mots clé 

// je veux vérifier que dans la valeur auteurs (tableau) j'ai au moins 1 valeur 


const Commentaire = mongoose.model("commentaires" , schemaCommentaire);

module.exports = Commentaire