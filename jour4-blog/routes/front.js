const { Router }= require("express");
const Articles = require("../model/article");
const {Types} = require("mongoose");

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

