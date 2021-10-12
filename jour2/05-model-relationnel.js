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
    },
    commentaires : [
        { 
            type : Schema.Types.ObjectId,
            ref : "commentaires"
        }
    ]
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

const schemaCommentaire = new Schema({
    contenu : String,
    date : {
        type : Date ,
        default : Date.now
    }
});

const Commentaire = model("commentaires" , schemaCommentaire);


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

//getArticles()

async function createCommentaire( contenu ){
    const resultat = await (new Commentaire({ contenu })).save()
    console.log(resultat)
}

/* createCommentaire( "premier commentaire" );  61657841f59daf6c186788ed
createCommentaire( "deuxième commentaire" );    61657841f59daf6c186788ee */

async function createArticle( id_utilisateur , tabIdCommentaire){
    const article = {
        titre : "nouvel article",
        contenu : "lorem ipsum",
        utilisateur : id_utilisateur,
        commentaires : tabIdCommentaire
    }
    const creer = new Article(article);
    const resultat = await creer.save();
    console.log(resultat);
}

//createArticle( "6165624d82b7a6eed8caeb00" , ["61657841f59daf6c186788ed", "61657841f59daf6c186788ee"])

async function getAll(){
    const liste = await Article.findById("616578dd591485d500c8426a")
                               .populate("utilisateur" )
                               .populate({
                                   path : "commentaires",
                                   select : { _id:0 , __v: 0}
                               } );
    console.log(liste);
}
getAll();

// relation entre les tables / collections 
// vous ne pouvez pas supprimer un utilisateur SI il est associé à une article 

// 1 - 1
// n - 1 => JOINTURE LEFT 

// dans le fichier en cours 

// ajouter une nouvelle propriété au schema article => commentaires tableau [ ObjectId ]

// créer un schema commentaire 
// 2 propriétés
// contenu string / obligatoire / min 5 caractères 
// date par défaut la date de maintenant 

// créer deux commentaires (récupérer les id des deux commentaires)
// créer un article qui avec être associé à un auteur existante et lui associer les deux commentaires que vous venez de créer 

// afficher tous les articles avec auteur associé et commentaires associés 


// approche imbriquée (tout stocker dans une seule table)
// approche hybride

// bon appétit 14h00 @ toute suite !!! 