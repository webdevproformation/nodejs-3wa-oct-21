// le fichier principal de notre application 

// express mongoose pug dotenv 
// faire la page d'accueil du site 

const express = require("express");
const pug = require("pug");
const app = express();
const frontRoutes = require("./routes/front")
const backRoutes = require("./routes/back")
const PORT = process.env.PORT || 5200;

require("./start/bdd")(); 

app.set("port" , PORT);
app.set("views", "views");
app.set(express.static("assets") );
app.set("view engine", "pug");

app.use("/" , frontRoutes);
app.use("/back" , backRoutes);




app.listen(PORT, console.log("serveur express démarré "+PORT))
