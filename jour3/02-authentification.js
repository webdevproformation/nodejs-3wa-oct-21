const express = require("express");
const {Schema, model , connect } = require("mongoose")
const bcrypt = require("bcrypt");

require("dotenv").config();

connect( process.env.BDD , {useNewUrlParser : true})
    .then( () => console.log("connexion à la base réussie"))
    .catch(ex  => console.log(new Error(ex)))


const app = express();

const PORT = process.env.PORT || 5600;

// schema 
// table dans la base de données => user 
//  / 
// login String obligatoire min 5 
// passeport  String obligatoire min 5 
// créer un model user 
// dans le fichier encours 

const schemaUser = new Schema({
    login : {
        type: String,
        required : true,
        minlength : 5
    },
    passeport : {
        type: String,
        required : true,
        minlength : 5
    }
});

const User = model("user" , schemaUser);

// avant de se connecter 
// il faut créer un compte utilisateur 

app.post("/inscription" , express.json() , async (req, rep) => {
    const profil = req.body ;

    // avant de créer le profil utilisateur => vérifier si il n'y a pas un autre compte qui n'a pas le même login 
    const isUnique = await User.findOne({ login : profil.login });
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
    // 
    // token de connexion 
    // bon appétit 14h15 @ toute suite !!!! 

    console.log(salt);

    rep.json(salt);



   /*  const creer = new User(profil);
    const resultat = await creer.save();
    rep.send("l'utilisateur est créé"); */
})


app.listen(PORT , console.log(`serveur express démarré sur le port ${PORT}`));
