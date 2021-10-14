const userRoutes = require("../routes/user")
const produitRoutes = require("../routes/produit")
const express = require("express");

module.exports = function(app){
    app.use(express.json());
    app.use("/", userRoutes);
    app.use("/", produitRoutes);
    app.use((err , req, rep, next) => { // middleware à mettre la fin de tous les autres 
        console.log(err);
        rep.status(500).send( new Error(err.message) );
    })
}
