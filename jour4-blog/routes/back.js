const { Router }= require("express");
const express = require("express");
const Article = require("../model/article");
const {Types} = require("mongoose");

const router = Router();
router.get("/add-article" , (req, rep) => {

    rep.render("back/add-article")
})

router.post("/add-article" , express.json() , async (req, rep) => {
    try{
        const creer = new Article( req.body )
        const resultat = await creer.save();
        rep.json({ success : resultat })
    }
    catch(ex){
        const message = [];
        for(let champs in ex.errors){
            message.push(ex.errors[champs].message)
        }
        rep.status(400).json({ error : message });
    }

    // établir une connexion à une base de données MOngoDB => jour5
    // créer un schema mongoose pour stocker les articles => 
    // titre string obligatoire // contenu string obligatoire 
    // dt de creation mise automatiquement à maintenant 
    // model => articles 
    // que l'on va pouvoir utiliser dans  la route add-article 
})

router.post("/add-commentaire", express.json() , async (req, rep) => {
    try{
        const {id_article , email , commentaire} = req.body ;
        console.log(id_article);
        if(!id_article){
            return rep.status(400).json({ error : "id_article manquant" })
        }

        if(!Types.ObjectId.isValid(id_article)){
            return rep.status(400).json({ error : "id_article invalid" })
        }

        let articleAModifier = await Article.findById(id_article);
        if(!articleAModifier){
            return rep.status(404).json({ error : "article introuvable" })
        }
        articleAModifier.commentaires.push({ email , commentaire }) 
        // document , qui contient une propriété qui est un []
        // ajouter un nouveau document => ajouter la méthode .push()
        const resultat = await articleAModifier.save()
        // après le push() => save() qui va effectuer l'enregistrement en base de données
        rep.json({ success : resultat });
    }
    catch(ex){
        const erreurs = [];
        for(let champ in ex.errors){
            erreurs.push(ex.errors[champ].message);
        }
        rep.status(400).json({error : erreurs});
    }
})

router.get("/add-user" , (req,rep) => {
    rep.render("back/add-user");
})

router.post("/add-user" , express.json(), (req,rep) => {
    rep.json(req.body); 
    // https
    // bcrypt()

    // vérifier que l'utilisateur 
})


module.exports = router ;