const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );


const schemaCommentaire = new mongoose.Schema({
    titre : String,
    auteurs : {
        type : Array ,
        validate : {
            validator : ( valeurs ) => {
                // retourner un boolean true => validation ok
                // ko => false => validation n'est pas passée 
                const verif = valeurs && valeurs.length > 0
                return verif;
            }
        }
    },
    categorie : {
        type : String ,
        required : true ,
        validate : {
            validator : ( valeurs ) => {
                return new Promise( (resolve , reject) => {
                    setTimeout( ()=> {
                        const categories = ["node","angular", "js"]
                        const verif = categories.includes(valeurs);
                        if(verif){
                           return resolve(true)
                        }
                        reject(false);
                    } , 5000)
                } )
            }
        }
    }
})
// https://mongoosejs.com/docs/validation.html liste des mots clé 

// je veux vérifier que dans la valeur auteurs (tableau) j'ai au moins 1 valeur 


const Commentaire = mongoose.model("commentaires" , schemaCommentaire);

async function creerCommentaire(){
    try{    
        const commentaire = {
            titre : "premier commentaire",
            auteurs : ["Alain", "Béatrice"] , // pas possible d'ajouter aucune valeur dans le tableau 
            categorie : "js"
        }
        const creer = new Commentaire(commentaire);
        const resultat = await creer.save();
        console.log(resultat)
    }catch(erreur){
        for(let champ in erreur.errors){
            console.log(erreur.errors[champ].message);
        }
    }
}
creerCommentaire();

// créer le fichier 08-exo.js 

// connexion à la base de données 
// schema pour Produit
// objet qui contient les valeurs suivantes :
// titre : string / obligatoire /min 3 / maximum 255
// prix : chiffre min 0 
// ref : validation spéciale : string qui doit respecter le pattern suivant
//           première lettre A B en majuscule
//           5 chiffres 0-9
//           A12345 => OK
//           C12345 => KO
//           A123456789 => KO
// categorie => validation spéciale  qui va nécessité d'appeler une autre base de données 
//           liste des catégories : ["hi-tech", "electroménager", "divers"]
//           reçue au bout de 2 secondes => vérifier que la valeur donnée est inclue dans ce tableau

// une fois créer le schéma et le module ajouter un nouveau document dans la table produits