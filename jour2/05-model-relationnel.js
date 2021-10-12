const {connect , Types , Schema , model} = require("mongoose");

require("dotenv").config();

connect( process.env.BD_RELATION , {useNewUrlParser : true} )
        .then(() => { console.log("connexion effectuée à la base")})
        .catch(erreur => { console.error(new Error( erreur)) })

// deux schemas 

// => Article
const schemaArticle = new Schema({
    titre : String,
    contenu : String,
    utilisateur : { // clé secondaire de la collection
        type : Schema.Types.ObjectId, // contient un ObjectId
        ref : "utilisateurs" // le nom de la table auquel ce champ est lié => ref est mot clé
    }
});

const Article = model("articles", schemaArticle);

// => Utilisateur 
const schemaUtilisateur = new Schema({
    nom : String,
    role : {
        type : String,
        enum : ["admin", "redacteur"]
    }
});

const Utilisateur = model("utilisateurs" , schemaUtilisateur);

// pour créer un article il faut D'ABORD créer un utilisateur 
// un fois créé l'utilisateur => créer l'article 

async function creerUtilisateur(){
    const user = {
        nom : "Tata",
        role : "admin"
    }
    const creer = new Utilisateur(user);
    const resultat = await creer.save();
    console.log(resultat);
}

// creerUtilisateur(); // 61655b16f96a80f1870969a6

async function creerArticle( id_utilisateur ){
    const article = {
        titre : "quatrième",
        contenu : "lorem ipsum",
        // utilisateur : id_utilisateur
    }
    const creer = new Article(article);
    const resultat = await creer.save();
    console.log(resultat);
}

//creerArticle( "616562799bbfbc0d3784f9e3" );

// recupérer article et l'utilisateur associé 

async function getArticles (){
    const resultat = await Article.find()
                                  .populate({
                                      path : "utilisateur", // le nom du champ à remplir 
                                      select : {_id : 0} // select pour afficher le ou les champs 
                                  })
                                  .select({ titre : 1 , contenu : 1 , _id : 0 })
    // Jointure 
    console.log(resultat);
}

getArticles()

// relation entre les tables / collections 
// vous ne pouvez pas supprimer un utilisateur SI il est associé à une article 

// 1 - 1
// n - 1 => JOINTURE LEFT 

