const { connect } = require("mongoose")
require("dotenv").config();

module.exports = function(){
    connect( process.env.BDD , {useNewUrlParser : true})
        .then( () => console.log("connexion à la base réussie"))
        .catch(ex  => console.log(new Error(ex)))
}