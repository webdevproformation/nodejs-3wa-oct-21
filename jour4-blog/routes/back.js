const { Router }= require("express");
const express = require("express");
const Article = require("../model/article");
const {Types} = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");

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

router.post("/add-user" , express.json(), async (req,rep) => {
    try{
        const { login , password } = req.body ;
         // vérifier si le login proposé n'est pas déjà enregistré dans la balise de données 
        if(!login){
            return rep.status(400).json({error : "veuillez donner un login "})
        }
        // si le login est unique alors 
        // hasher le passort et l'enregistrer en base de données 
        const profilRecherche = await User.findOne({login : login}) // null 
        if(profilRecherche !== null){
            return rep.status(400).json({error : "le login est déjà utilisé"})
        }
        // npm i bcrypt
        const salt = await bcrypt.genSalt()
        const passwordHashed = await bcrypt.hash( password , salt );
        const creer = new User({ login , password : passwordHashed })
        const resultat = await creer.save();
        rep.send({success : resultat});
    }
    catch(ex){
        const erreurs = []
        for(let champ in ex.errors){
            erreurs.push(ex.errors[champ].message);
        }
        rep.status(400).json({error : erreurs})
    }
})


module.exports = router ;