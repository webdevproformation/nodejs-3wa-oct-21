const { Router }= require("express");
const express = require("express");

const router = Router();
router.get("/add-article" , (req, rep) => {

    rep.render("back/add-article")
})

router.post("/add-article" , [express.urlencoded({extended : false}) , express.json()] , (req, rep) => {
    console.log(req.article);
    rep.json(req.body)
})


module.exports = router ;