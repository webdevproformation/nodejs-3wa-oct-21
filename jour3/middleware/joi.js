const Joi = require("joi")

function validUtilisateur(req, rep , next){
    const utilisateur = req.body;
    const schema = Joi.object({
        titre : Joi.string().required(),
        contenu : Joi.string().required(),
        date : Joi.date().optional()
    })
    const { value , error } = schema.validate(utilisateur, { abortEarly : false });
    if(error){
        return rep.status(400).send(error.message)
    }
    next();
}

module.exports = validUtilisateur ; 