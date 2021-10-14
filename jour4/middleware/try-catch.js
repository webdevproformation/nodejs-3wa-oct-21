// fonction de type factory : fonction qui retourne une fonction qui a la signature de fonction pour express

module.exports = function(traitement){
   return async (req, rep, next) => {
        try{
            await traitement();
        }
        catch(ex){
            next(ex) ;
        }
   }
}