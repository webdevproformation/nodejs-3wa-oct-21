const { Router }= require("express");
const express = require("express");
const Article = require("../model/article");

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


module.exports = router ;