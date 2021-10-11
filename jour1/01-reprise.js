// manipuler des bases de données mongoDB 
// mongoDB base de données NoSQL utilise pas la langage SQL pour communiquer avec les données
// utiliser du javascript pour réaliser des opérations sur la base de données 

// facilement interagir avec la base de données 
// téléchargé un package node => mongoose

// => description du package est disponible sur le site npmjs.com

// page https://www.npmjs.com/package/mongoose 
// https://mongoosejs.com/

// ORM : Object Relationnal Mapper => utiliser des objects / class pour manipuler notre base de données 

// télécharger la librairie => npm : Node Package Manager pour télécharger mongoose 

// cd jour1 Enter
// npm init --yes => créer un fichier package.json 
// donner les "meta informations du projet" => dépendance du projet

// npm install mongoose
// npm i mongoose
// 1 créer un dossier node_modules qui contient mongoose et ses dépendances
// 2 mettre à jour le fichier package.json
/**
"dependencies": {
    "mongoose": "^6.0.10"
  }
 */
// package-lock.json : où exactement sur internet les fichiers/ dossiers dans node_modules ont été téléchargés 

// utiliser cette librairie dans notre fichier .js actuel 
// require() => importer la librairie pour l'utiliser dans le fichier actuel 

const mongoose = require("mongoose");

// 1 ajouter une information dans une base de données 
// créer une base de données // où on va enregistrer nos données 
// société qui gére le logiciel MongoDB propose une solution sur internet "Atlas"
// se créer un compte sur ce site 

// 2 connexion avec cette base sur internet 
// 3 schema <=> mapper => la forme des données qui vont être envoyés à la base de données 
// 4 model => objet qui permet de Manipuler notre base de données 
// 5 traitement : Create Read Update Delete 


// Base de Données MySQL => 
// phpMyAdmin => base / table / colonnes 
// SQL qui va te permettre Create Read Update Delete

// $connexion = new PDO("url" , "login" , "pass");
// $std = $connexion->prepare("SELECT * FROM articles");
// $std->execute()


// en NoSQL pas définir les colonnes de la table 
// MAIS si on utilise mongoose =>  schema 

// Atlas => pour créer notre base de données 

// mongoose.connect("url");
// schema = mongoose.schema({ titre : String , contenu : String })
// Article = mongoose.model( "articles" , schema ) ;
// Article.find(); // "SELECT * FROM articles" ;

// https://www.mongodb.com/fr-fr

// une fois que l'on crée notre Cluster => ( contenant de base de données / créer et sotkcer plusieurs base de données )
// récupérer les identifiants de connexion au Cluster 
// adresse internet => url 
// 4 informations : 
// où les cluster est disponible sur internet 
// login / mot de passe / nom de la base 
// pour utiliser notre base de données Atlas 

// Add a connection IP address
// Compte pour pouvoir utiliser cette base de données 
// login : admin
// mdp : admin


// mongodb+srv://admin:<password>@cluster0.k1o57.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// récupérer l'url de connexion => 
// adapter  <password> => admin
// adapter  myFirstDatabase? => jour1

// mongodb+srv://admin:admin@cluster0.k1o57.mongodb.net/jour1?retryWrites=true&w=majority

// ip => limiter l'accès à votre base de données pour une Machine / IP bien préciser 
// éviter que n'importe QUI (client) puisse contacter / utiliser votre base de données 

// finit avec la base de données => cluster / récupérer nos identifiants /  donné les droits d'y accéder 

// 2 connexion avec cette base sur internet 
// cd jour1
// npm init --yes
// npm i mongoose

const urlBddMongoDB = "mongodb+srv://XXXXXXXXXXXXXXXXXXXXXXXX" ;
mongoose.connect( urlBddMongoDB , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );

// exécuter => node 01-reprise.js
// nodemon 01-reprise.js // permet de recharger notre connexion dès que l'on a modifier le fichier .js 

// 3 schema <=> mapper => la forme des données qui vont être envoyés à la base de données 
const articleSchema = new mongoose.Schema({
    titre : String ,
    contenu : String ,
    like : Number
});

// 4 model => objet qui permet de Manipuler notre base de données / table => collection 
const Article = mongoose.model("articles" , articleSchema );


// 5 traitement : Create Read Update Delete 

// ajouter un premier enregistrement dans la collection articles / base jour1 

const nouvelArticle = {
    titre : "Premier article",
    contenu : "lorem ipsum ...",
    like : 20
};

const creerArticle = new Article( nouvelArticle )

creerArticle.save() // lancer le create dans la collection
            .then( (reponse) => { 
                console.log( reponse ); // OK 
            }  )
            .catch((erreur) => {
                console.log(new Error(erreur))
            });
// ajouter des enregistrements dans la collection 
// document dans la collection jour1
// pause café => rdv 11h30 @ toute suite !! 
// stopper nodemon 
// schema
// 02-schema.js


