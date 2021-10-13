const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./02-model");

const route = express.Router() 
// object { get / post / }
// 02-authentification.js app.use("/" , route)

route.post("/inscription" , express.json() , async (req, rep) => {
    let profil = req.body ;

    // avant de créer le profil utilisateur => vérifier si il n'y a pas un autre compte qui n'a pas le même login 
    const isUnique = await User.findOne({ login : profil.login });
    console.log(isUnique)
    if(isUnique){
        return rep.status(400).send("veuillez choisir un autre login")
    }

    // crypter le mot de passe que l'on va soumettre 
    // utiliser une librairie bcrypt  => hasher les mots de passe
    // hasher un mot de passe "azerty" => "ezodhuzeocoznI76H8ètn_"
    // l'inverse de hasher un mot de passe "azerty" <= "ezodhuzeocoznI76H8ètn_"
    // n'existe pas
    // si l'utilisateur ne se rappelle plus le mot de passe en clair
    // la seule solution "qwerty" => "98698G87T09896B"
    // npm i bcrypt
    // salter un mot de passe 
    // "qwerty" => salter (ajouter un grain de sel )
    // "5675765qwerty8586586" => "97TIYGOIUGYUIVLGvhi"
    const salt = await bcrypt.genSalt() // puissance calcul pour générer le salt => 

    // npm i joi joi-password-complexity

    const passwordHashed = await bcrypt.hash(profil.password, salt);
    profil = {
        login : profil.login ,
        password : passwordHashed
    };
    const creer = new User(profil);
    const resultat = await creer.save();
    rep.json(resultat);
})


module.exports = route ;