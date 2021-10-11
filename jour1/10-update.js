const { connect , Types } = require("mongoose");
const Utilisateur = require("./09-model-utilisateur");
require("dotenv").config();

connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );


// modifier la valeur stockée sur un utilisateur

// 2 manières de faire
// QueryFirst 

async function modifierUtilisateur(id){
    // recherché dans la base de données éléments qui a l'id recherché
    // const utilisateurAModifier = await Utilisateur.findOne({ _id : id } )
    // tester l'id donnée est un id valide => correspond au format id MongoDB
    if(!Types.ObjectId.isValid( id )){
        return console.log( `l'id ${id} n'est pas valide` );
    }
    const utilisateurAModifier = await Utilisateur.findById( id );
    if(utilisateurAModifier){
        // modifier et enregistrer 
        try{
            utilisateurAModifier.nom = [];
            utilisateurAModifier.age = "un peu de texte" ;
            const resultat = await utilisateurAModifier.save()
            console.log(resultat);
        }catch(erreur){
            for(let champ in erreur.errors){
                console.log(erreur.errors[champ].message)
            }
        }
        return ;
    }
    return console.log(`aucun utilisateur n'a l'id ${id}`);
}

modifierUtilisateur("toto");

// UpdateFirst
