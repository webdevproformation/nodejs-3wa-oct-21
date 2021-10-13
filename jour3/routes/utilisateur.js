//routes/utilisateur.js
const express = require("express");
const Utilisateur = require("../model/utilisateur");
const validUtilisateur = require("../middleware/joi");
const validId = require("../middleware/valid-id");
const asyncTryCatch = require("../middleware/try-catch");

const router = express.Router();

router.get("/" , asyncTryCatch( async (req, rep , next) => { 
    const resultat = await Utilisateur.find();
    rep.json(resultat);
}))

router.post("/" , [express.json() ,validUtilisateur] , asyncTryCatch( async (req, rep , next) => { 
    const utilisateur = req.body; 
    const creer = new Utilisateur(utilisateur)
    const resultat = await creer.save()
    rep.json(resultat);
}))
router.put("/:id" , [express.json() , validId , validUtilisateur]  , asyncTryCatch(async (req, rep , next) => { 

    const id = req.params.id ;
    const utilisateur = req.body; 
    const utilisateurAModifier = await Utilisateur.findByIdAndUpdate(
            id, 
            { $set : { titre : utilisateur.titre ,contenu : utilisateur.contenu }} 
            , 
            { new : true } 
    );
    if(!utilisateurAModifier){
        return rep.status(404).send("utilisateur inconnu");
    }
    return rep.json(utilisateurAModifier);
}))
router.delete("/:id" , validId , asyncTryCatch(async (req, rep , next) => { 
    const id = req.params.id ;
    const resultat = await Utilisateur.deleteOne({ _id : id });
    if(resultat.deletedCount === 0){
        return rep.status(404).send("utilisateur n'existe pas");
    }
    return rep.send("l'utilisateur a bien été supprimé");
}));


module.exports = router ; 