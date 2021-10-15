const { Router }= require("express");
const Articles = require("../model/article");
const {Types} = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const express = require("express");

const router = Router();
router.get("/" , async (req, rep) => {
    try{
        const articles = await Articles.find()
        const www = `${req.protocol}://${req.hostname}:5200/` ;
        rep.render("front/index" , { articles , www })
    }
    catch(ex){
        rep.status(500).send("une erreur s'est produite")
    }
})

// mettre le /404 AVANT  /:id
router.get("/404", (req, rep) => {
    rep.render("front/404");
});

router.get("/connexion" , (req, rep) => {
    rep.render("front/connexion");
})

router.post("/connexion" , express.json() , async (req, rep) => {
    // vérifier si l'utilisateur existe ?? 
    const {login , password} = req.body;
    
    if(!login){
        return rep.status(400).json({error : "veuillez fournir un login"})
    }    // si oui jsonwebtoken

    const profilRecherche = await User.findOne({login});
    if(profilRecherche === null){
        return rep.status(404).json({error : "aucun profil trouvé"})
    }

    bcrypt.compare(password , profilRecherche.password , (err , resultat) => {
        if(resultat){
            const token = profilRecherche.genererJWT();

           return rep.header("x-auth" , token)
                     .header("access-control-expose-headers" , "x-auth" )
                     .json({success : "Welcome"})
        }
        return rep.status(404).json({error : "password invalid"})
    }  )

})

// route à mettre à la fin des autres routes 
router.get("/:id" , async (req, rep) => {
    try{
        const id = req.params.id ; 
        if(!Types.ObjectId.isValid(id)){
            // rediger l'utilisateur vers une page 404 
            return rep.status(404).redirect("/404");
        }
        const article  =  await Articles.findById(id);
        if(!article){
            // si l'id correcte mais que l'article n'existe pas avec l'id donnée
            return rep.redirect("/404");
        }

        return rep.render("front/article" , { article });
    }
    catch(ex) {
        rep.status(500).send("erreur s'est produite");
    }
})




module.exports = router ;

