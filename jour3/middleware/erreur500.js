function erreur500(err, req, rep, next){
    console.log(err);
    rep.status(500).send("une erreur s'est produite");
}

module.exports = erreur500; 