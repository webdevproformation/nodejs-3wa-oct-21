const { Router } = require("express")
const jwt = require("jsonwebtoken");
const Produit = require("../models/produit");
require("dotenv").config();
const router = Router()
router.post("/creer-produit" , async ( req, rep , next) => {
    try{
        const token = req.header("x-auth");
        const decoder = jwt.verify(token , process.env.SECRET_JWT);
        const { nom , prix } = req.body ;

        const nouveauProduit = new Produit ({ 
            nom : nom ,
            prix : prix,
            auteur : decoder._id
        })
        const resultat = await nouveauProduit.save();
        rep.send(resultat);
    }
    catch(ex){
        next(ex)
    }
})
module.exports = router;

// 1 collection (table) + model dédié (CRUD + opération sur cette table) + route dédié 