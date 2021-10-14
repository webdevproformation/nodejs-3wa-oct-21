// fonction de type factory : fonction qui retourne une fonction qui a la signature de fonction pour express
// rdv 11h25 @ toute suite !!! 
module.exports = function asyncTryCatch (traitement){
   return async (req, rep, next) => {
        try{
            await traitement();
        }
        catch(ex){
            next(ex) ;
        }
   }
}