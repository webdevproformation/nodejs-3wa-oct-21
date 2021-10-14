const { connect } = require("mongoose"); 
require("dotenv").config()

module.exports = function(){ 
    connect( process.env.DB , {useNewUrlParser : true})
        .then( () => console.log("la base est disponible"))
        .catch( ex => console.log( new Error(ex)));
}

