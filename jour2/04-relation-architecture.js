/**
MySQL et PHP 
stocker plusieurs concepts => découper en plusieurs tables

// déconseillé en MySQL / PHP => 

// approche imbriquée
table articles
        id
        titre
        contenu
        auteur_nom
        auteur_role

// approche relationnelle => MySQL et PHP 

table articles
        id
        titre
        contenu
        id_auteur (clé secondaire) 

table auteurs
        id (clé primaire) unique
        nom
        role

sur les bases de données NoSQL 

// utiliser l'approche imbriquée 1 table dans laquelle vous allez avoir une partie des informations qui sont répétés
// find() => moins de requêtes à effectuer pour récupérer informations
// update () => un peu plus compliquée effectuer plus de mis à jour 

// approche relationnelle
// find() => pour récupérer toutes les informations / plus re requêtes à effectuer
// update() => moins compliquée

// approche hybride (relation / imbriquée )


table articles
        id
        titre
        contenu
        auteur_nom
        id_auteur (clé secondaire) 

table auteurs
        id (clé primaire) unique
        nom
        role

// approche relationnelle
// find() => pour récupérer toutes les informations / et les informations moins importante sont dans une autre table
// update() => unique si vous ne devrez modifier que le rôle
            => nom doit être modifié articles / table auteurs 

// imbriquée => tout est dans 1 seule table
// relationnelle => PHP MySQL
// hybride => un peu des deux manières d'organiser vos tables

// 05-model-relationnel.js




 * 
 */