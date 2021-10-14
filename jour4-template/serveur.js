// npm init --yes
// npm i express mongoose dotenv pug 
// créer un dossier public 
// créer un dossier views 
// mkdir public views

const express = require("express"); 
const app = express();

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

const PORT = process.env.PORT || 5222;
app.listen(PORT , () => console.log(`serveur express démarré sur le port ${PORT}`));

