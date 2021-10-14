const userRoutes = require("../routes/user")
const produitRoutes = require("../routes/produit")

module.exports = function(app){
    app.use("/", userRoutes);
    app.use("/", produitRoutes);
}
