// factory => fonction qui retourne une fonction qui a la signature d'une 
// callback de express 
function asyncTryCatch(action){
    return async (req , rep, next ) => {
        try{
            await action()
        }catch(ex){
            next(ex)
        }
    }
}

module.exports = asyncTryCatch ; 
