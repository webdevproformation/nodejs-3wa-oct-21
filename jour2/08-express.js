const app = require("express")();
// const express = require("express")
// const app = express()
const { connect , Types } = require("mongoose")
require("dotenv").config();
// créer le fichier 08-model.js // récupérer les schemas et le model dans le fichier 06
const Article = require("./08-model");
const PORT = process.env.PORT || 5200;

connect( process.env.BD_IMBRIQUEE , { useNewUrlParser : true})
    .then(() => { console.log("connexion à la balise Mongo Réussie")})
    .catch( (erreur) => {console.log(new Error(erreur))} )

app.listen( PORT, () => { console.log(`le serveur express ecoute sur le port ${PORT}`) } )
app.get("/", (req, rep) => { // http://localhost:5200
    rep.send("bonjour");
});
app.get("/api", async (req, rep ) => {
    const article = await Article.find();
    rep.header({"Content-Type": "application/json"})
    rep.send(article) // string / string qui contient html 
    //rep.json(article) // json  
});

// créer une nouvelle route qui permet de rechercher tous les articles qui ont été écrit par 
// Béatrice 

app.get("/api/auteur/:nom" , async(req , rep) => {
    const nom = req.params.nom ;
    const articles = await Article.find({"utilisateur.nom" : nom});
    if(articles.length === 0){
        return rep.status(404).send(`aucun article pour ${nom}`);
    }
    return rep.json(articles);
})

// middleware 
function verifIdCorrect(req , rep , next){
    const id = req.params.id;
    if(!Types.ObjectId.isValid(id)){
        return rep.status(400).send("l'id donnée n'est pas conforme");
    }
    req.message = "la vérification a bien été effectuée";
    req.id = id;
    next();
}

app.get("/api/:id" , [verifIdCorrect] , async (req, rep) => {
    try{
        // throw new Error("problème sur le serveur ...");
        const article = await Article.findById(req.id);
        if(!article){
            return rep.status(404).send("l'article demandé n'existe pas");
        }
        return rep.json(article);
    }catch(erreur){
        return rep.status(500).send(erreur.message);
    }
})



app.get( "/:id", (req, rep) => {
    const id = req.params.id;
    rep.send(`vous demandez l'article avec l'id ${id}`);
})


