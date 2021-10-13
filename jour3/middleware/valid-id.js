const { Types } = require("mongoose");

function validId(req, rep, next){
    const id = req.params.id
    if( !Types.ObjectId.isValid(id)){
        return rep.status(400).send("l'id n'est pas valide")
    }
    next();
}

module.exports = validId ; 