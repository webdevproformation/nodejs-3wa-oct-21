const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const route = express.Router();
// pour pouvoir voir la liste des utilisateurs il faut au préalable avoir donné un jsonwebtoken valid
route.get("/utilisateur" , (req, rep) => {
    try{
        const token = req.header("x-token"); 
        // stocker cette information dans le localStorage  

        const profilDecode = jwt.verify( token , process.env.SECRET  );

        console.log(profilDecode);
        const utilisateurs = [
            {id : 1 , nom : "utilisateur 1"},
            {id : 2 , nom : "utilisateur 2"}
        ]
        rep.json(utilisateurs);
    }catch(ex){
        return rep.status(403).send("vous n'êtes pas autorisé à accéder à cette page");
    }
    
})

module.exports = route ;