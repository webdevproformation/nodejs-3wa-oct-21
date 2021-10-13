const jwt = require("jsonwebtoken");


const article = {
    titre : "article 1",
    contenu : "lorem ipsum"
}

const token = jwt.sign( article , "clé secrête" ); // json webtoken

console.log(token);

const tokenHashed =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aXRyZSI6ImFydGljbGUgMSIsImNvbnRlbnUiOiJsb3JlbSBpcHN1bSIsImlhdCI6MTYzNDEzNTYxOH0.PDCVvqeN5g4dGQbOSS0_V1KxGrG3wRNfP7q5wI33MJk"

const tokenDecrypte = jwt.verify(tokenHashed , "clé secrête");

console.log(tokenDecrypte);
