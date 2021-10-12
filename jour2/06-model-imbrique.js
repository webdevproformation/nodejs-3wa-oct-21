const {connect , Types , Schema , model} = require("mongoose");

require("dotenv").config();

connect( process.env.BD_IMBRIQUEE , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })

// article qui sont créés par un utilisateur

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

// créer un article qui contient un utilisateur 

async function creerArticleAvecUtilisateur(titre){
    const article = {
        titre : titre,
        contenu : "lorem ipsum",
        utilisateur : {
            nom : "Pierre",
            role : "admin"
        }
    }
    const creer = new Article(article);
    const resultat = await creer.save();
    console.log(resultat);
}
/* creerArticleAvecUtilisateur("deuxieme article");
creerArticleAvecUtilisateur("troisième article");
creerArticleAvecUtilisateur("quatrième article");
creerArticleAvecUtilisateur("cinquième article"); */

// asynchrone => dès que le Thread du processeur est disponible
// le code n'est exécuté dans l'ordre dans lequel vous l'avez écrit 

// Pierre => changer de rôle admin => rédacteur 
// il faut parcourir tous les documents dans la table articles et modifier chaque fois 
// que l'utilisateur a le nom Pierre 
// impossible d'utiliser les ObjectId => ils sont différents

// modifier 2, 3 , 4ème article 

async function updateUtilisateur(){
   const r =  await Article.updateMany({"utilisateur.nom" : "Pierre"} , { $set : { "utilisateur.role" : "redacteur" }})
   console.log(r);
}
// updateUtilisateur();

// supprimer tous les articles qui ont été rédigés par des admins 

async function deleteArticleAdmin(){
    const r =  await Article.deleteMany({"utilisateur.role" : "admin"} );
    console.log(r);
}

deleteArticleAdmin()

// cas pratique :
// dans le fichier existant 
// les utilisateurs vont pouvoir liker les articles que l'on créé

// nom : chiffre / par défaut il vaut  0 / min 0 
// dt : date / par défaut maintenant
// ip : string / validation avancée 000.000.000.000  000.0.0.000

// créer un nouvel article avec utilisateur et like 
/**
        titre : exo 6,
        contenu : "lorem ipsum",
        utilisateur : {
            nom : "Béatrice",
            role : "redacteur"
        },
        like : {
            ip : "1.2.3.4"
        }
 */

// modifier le nombre de like à 30 


async function creerArticleAvecUtilisateurEtLike(titre){
    const article = {
        titre ,
        contenu : "lorem ipsum",
        utilisateur : {
            nom : "Béatrice",
            role : "redacteur"
        },
        like : {
            ip : "1.2.3.4"
        }
    }
    const creer = new Article(article);
    const resultat = await creer.save();
    console.log(resultat);
}

// creerArticleAvecUtilisateurEtLike("article de Béatrice avec 0 like");

// 61658a24834f2e122e5f7c28

async function updateLike(id_article){

    const resultat = await Article.updateOne({_id : id_article} , { $set : { "like.nom" : 30 } })
    console.log(resultat)
}

updateLike("61658a24834f2e122e5f7c28")

// 07-model-hybride.js

