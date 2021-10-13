const express = require("express");
const User = require("./02-model");
const bcrypt = require("bcrypt");

const route = express.Router();


route.post("/connexion" , express.json(), async(req, rep) => {
    let profil = req.body ;

    // vérifier si le login envoyé existe dans la base de données 
    const profilRecherche = await User.findOne({login : profil.login });

    // personne => null
    if(!profilRecherche){
        return rep.status(404).send("aucun profil trouvé");
    }

    // vérifier que le password (haché) correpond bien à celui stocké en base de données
    bcrypt.compare( profil.password , profilRecherche.password , (err , result) => { 
        if(!result){
            return rep.status(404).send("le mot de passe n'est pas le bon")
        }
        const token = profilRecherche.generateToken();

        rep.header("x-token" , token) 
            .header("access-control-expose-headers" , "x-token") // ajouter un entête personnalisé
            .json({
                message : "Bienvenu"
            });
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers

        // serveur doit nous retourner clé qui va lui permettre de comprendre qui on est 
        // jsonwebtoken
        // algorithme qui générer token sous forme de json 
        // crypter et le décrypter + clé secret 
        // https://jwt.io/
        // npm i jsonwebtoken
    } )  
    // rdv dans 15 min => 16h15 bon café @ toute suite !! 
    // fin de la partie authentification : créer un profil / connexion
    // autorisation => clé jsonwebtoken 
    // clé qui va être généré via un algorithme 
    // clé difficile de hacker <=> prouver que vous êtes bien l'utilisateur concerné 
    
    /**
     * {
            "login" : "admin2",
            "password" : "Toto12!"
        }
     */
})

module.exports = route ;

