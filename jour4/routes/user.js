const { Router } = require("express");
const User = require("../models/user");
const express = require("express");
const asyncTryCatch = require("../middleware/try-catch")

const router = Router()

// CREATE
router.post("/creation" , express.json() , asyncTryCatch( async ( req, rep , next ) => {

    const profil = req.body ;

    // vérifier si le login n'est pas déjà utilisé 

    // crypter le mot de passe 

    // effectuer la création dans la table

}))


router.post("/connection" , asyncTryCatch( async ( req, rep , next ) => {

    
}))


module.exports = router;