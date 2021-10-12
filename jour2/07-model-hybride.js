const {connect , Types , Schema , model} = require("mongoose");

require("dotenv").config();

connect( process.env.BD_HYBRIDE , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })


const schemaUtilisateur = new Schema({
    nom : String ,
    role : { type : String , enum : ["admin", "redacteur"]}
});
const Utilisateur = model("utilisateurs", schemaUtilisateur)
const schemaArticle = new Schema({
    titre : String,
    contenu : String ,
    nom_utilisateur : String ,
    utilisateur : {type : Types.ObjectId,ref : "utilisateurs"}
})
const Article = model("articles" , schemaArticle)
// créer un article avec une référence vers l'utilisateur 
async function creerArticle (utilisateur){
    const article = {
        titre : "nouvel article ",
        contenu : "lorem ipsum",
        nom_utilisateur : utilisateur.nom ,
        utilisateur : utilisateur._id
    }
    const creer = new Article(article) ;
    const resultat = await creer.save();
    const user = await utilisateur.save();
    console.log(resultat , user);
};
// creerArticle ( new Utilisateur({ nom : "Pierre",role : "redacteur"}))

// modifier les droits =>  des articles écrits par Alain

async function update(){
    const resultat = await Utilisateur.updateMany({nom : "Alain"} , { $set : { role : "admin" }})
    console.log(resultat);
}

update();

// bon café => 16h15 
// express // api complète 
// express / mongoose 

// outil pour faire templating => pug 
// authenfication connecter au préalable pour pouvoir modifier / supprimer des éléments dans votre base de données
// session / cookie // token d'authentification 


// 08-api.js