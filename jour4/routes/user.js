const { Router } = require("express");
const User = require("../models/user");
const asyncTryCatch = require("../middleware/try-catch")
const bcrypt = require("bcrypt");

const router = Router()

// CREATE
router.post("/creation" ,   async ( req, rep ,next ) => {
    try{
        const { email , password , role } = req.body ;
        //return rep.json(req.body);
        
        // vérifier si le login n'est pas déjà utilisé 
        const recherche = await User.findOne({ email : email });
        if( recherche ){
        return rep.status(400).send("email déjà utilisé")
        }
        // crypter le mot de passe 
        const salt = await bcrypt.genSalt();
        const motPassHashe = await bcrypt.hash(password , salt)
        // effectuer la création dans la table
        const nouveauProfil = {
            email : email ,
            password : motPassHashe,
            role : role
        }
        const creer = new User(nouveauProfil)
        const reponse = await creer.save();
        rep.json(reponse);
    }
    catch(ex){
        next(ex)
    }
})

router.post("/connection" , async ( req, rep , next ) => {
    try{
        const { email , password } = req.body ;

        const recherche = await User.findOne({ email : email });
       
        if( !recherche ){
            return rep.status(404).send("l'utilisateur n'existe pas")
        }
        // prendre le mot de passe et le vérifier == mot de passe dans la base de donnée hashé

        bcrypt.compare(password , recherche.password , (err, resultat) => {
            if(resultat){
                const token = recherche.genererJWT();

                return rep.header("x-auth", token)
                          .header("access-control-expose-headers", "x-auth")
                          .send("bienvenu")
            }
            return rep.status(404).send("erreur sur le mot de passe")
        })
    }catch(ex){
        next(ex);
    }
})


module.exports = router;