const { connect , Schema , model } = require("mongoose");
require("dotenv").config();

connect( process.env.URLBDD , { useNewUrlParser : true } )
        .then( () => { console.log("connexion à la base Mongo effectuée")} )
        .catch( (err) => { console.log(new Error(err)) }  );

const schemaProduit = new Schema ({
    titre : {
        type : String ,
        required : [true , "le champ titre est obligatoire"] ,
        minlength : 3 ,
        maxlength : 255
    },
    prix : {
        type : Number ,
        min : [0 , "le prix doit être un chiffre positif"],
    },
    ref : {
        type : String,
        validate : {
            validator : (valeur) => {
                const verif = /^[AB][0-9]{5}$/;

                return verif.test(valeur);
            },
            message : "la ref doit de la format /^[AB][0-9]{5}$/"
        }
    },
    categorie : {
        type : String,
        validate : {
            validator : (valeur) => {
                return new Promise((resolve , reject) => {
                    setTimeout( () => {
                        const categories = ["hi-tech", "electroménager", "divers"];
                        if(categories.includes(valeur)){
                            return resolve(true)
                        }
                        return resolve(false);
                    }, 2000)
                })
            },
            message : "la catégorie mentionnée est invalide" 
        }
    }
});

const Produit = model("produits", schemaProduit);

const creerProduit = async ( ) => {
    try{
        const produit = {
            // titre : "produit 1",
            prix : -20 ,
            ref : "A12345777",
            categorie : "inconnue"
        }
       const creer =  new Produit (produit);
       const resultat = await creer.save()
       console.log(resultat);
    } catch(err){
        for(let item in err.errors){
            console.log(err.errors[item].message)
        }
    }
}

creerProduit();

// schema => comment le créer / role 
// ajouter des valeurs dans la base de données 
// lire récupérer des données 
// modifier 
// supprimer 

// relation entre les tables 
// 16h21 @ toute suite !! 

// 09-query.js