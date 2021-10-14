// npm init --yes
// npm i express mongoose dotenv pug 
// créer un dossier public 
// créer un dossier views 
// mkdir public views

const express = require("express"); 
const app = express();
const data = require("./data/infos");

app.set("views","views"); // permet de dire à express où chercher les fichiers de vue 

app.set("view engine" , "pug") ; // définir le moteur de rendu => pug 

app.use(express.static("public")) // définir le dossier racine qui va contenir les assets : fichiers css / image / javascript / document pdf ... 

// page d'accueil 
app.get("/" , (req, rep) => {
    rep.render("01-index");
})

app.get("/complete" , (req, rep) => {
    rep.render("02-complete");
})

app.get("/variables" , (req, rep) => {
    
    const contenu = {
        titre : "premier article",
        contenu : "lorem ipsum",
        meta : {
            auteur : "moi",
            like : 10
        },
        categories : ["node", "js", "angular"]
    }
    rep.render("03-variables" , contenu);
})

app.get("/import", (req, rep) => {
    const mentions = {
        annee : 2012
    }
    rep.render("04-import" , mentions);
})

app.get("/extends-block", (req, rep) => {
    const mentions = {
        annee : 2012
    }
    rep.render("05-extends-block" , mentions);
})

app.get("/variable-template", (req, rep) => {
    const produit = {
        prix : 30
    }
    rep.render("06-variable-template" , produit);
})

app.get("/loop", (req, rep) => {
    const produits = {
        produits : [
            { nom : "produit 1" , prix : 30},
            { nom : "produit 2" , prix : 50},
        ]
    }
    rep.render("07-loop" , produits);
})

app.get("/exo", (req, rep) => {
    const liste = {
        data : data
    }
    rep.render("08-tableau-de-bord" , liste);
})

// créer un nouvelle route /exo => appeler fichier 08-tableau-de-bord.pug

// ce fichier va extends un fichier pug template back-office 
/**
head
body
    inclure un template => menu 
    block tableau-debord

 */

// fichier liste ul avec 3 li qui contient chacun Accueil / Présentation / Contact


// 08-tableau-de-bord.pug 
// tableau <table> qui va contenir la liste d'articles suivantes (qui est envoyée depuis le fichier server.js)





const PORT = process.env.PORT || 5222;
app.listen(PORT , () => console.log(`serveur express démarré sur le port ${PORT}`));

