const {Schema , model} = require("mongoose");

const schemaLike = new Schema({
    nom : {
        type : Number,
        min : 0,
        default : 0
    },
    ip : {
        type : String,
        validate : {
            validator : (valeur) => {
                const patternIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                return patternIp.test(valeur);
            },
            message : "ip saisit n'est pas valide"
        }
    },
    dt : {
        type : Date,
        default : Date.now 
    }
})

const schemaUtilisateur = new Schema({
    nom : String,
    role : {
        type : String,
        enum : ["admin", "redacteur"]
    }
})

// const Utilisateur = model("utilisateurs", schemaUtilisateur)

const schemaArticle = new Schema({
    titre : String ,
    contenu : String,
    utilisateur : schemaUtilisateur, // mettre le champ = Schema de l'utilisateur 
    like : schemaLike
});

const Article = model("articles", schemaArticle);

module.exports = Article ;