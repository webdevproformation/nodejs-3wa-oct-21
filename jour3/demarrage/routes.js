const routerUtilisateur = require("../routes/utilisateur");
const erreur500 = require("../middleware/erreur500");

module.exports = function(app){
    // middleware globale 
    // ajouter à express un comportement lorsqu'il reçoit requête  
    app.use("/" , routerUtilisateur);
    app.use(erreur500); // à la suite des routes 
}