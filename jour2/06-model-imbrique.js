const {connect , Types , Schema , model} = require("mongoose");

require("dotenv").config();

connect( process.env.BD_IMBRIQUEE , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })

// article qui sont créés par un utilisateur

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
    utilisateur : schemaUtilisateur // mettre le champ = Schema de l'utilisateur 
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








