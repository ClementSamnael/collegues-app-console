var lg = console.log;

// récupération du module `readline`
var readline = require('readline');
var service = require('./service');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    lg('1. Recherhche un collègue par nom');
    lg('2. Créer un collègue');
    lg('3. Modifier l\'email');
    lg('4. Modifier la photo');
    lg('99. Sortir');
    // récupération de la saisie utilisateur
    rl.question('Votre choix : ', function (saisie) {
        switch (saisie) {
            case '1':
                rechercherCollegues();
                break;
            case '2':
                ajouterCollegue();
                break;
            case '3':
                lg('Fonction non implémentée');
                rl.close();
                break;
            case '4':
                lg('Fonction non implémentée');
                rl.close();
                break;
            case '99':
                lg('Au revoir');
                rl.close();
                break;
            default:
                rl.close();
                break;
        }
    });
}

function rechercherCollegues() {
    rl.question('Nom recherché : ', function (saisie) {
        var tableCollegue;
        var i = 0;
        service.rechercherColleguesParNom(saisie, function (colleguesTrouves) {
            lg('>> Recherche en cours du nom ' + saisie);
            //lg(colleguesTrouves);
            tableCollegue = colleguesTrouves.length;
            colleguesTrouves.forEach(function (element) {
                service.recherhcherCollegueParMatricule(element, function (colleguesTrouves) {
                    lg(colleguesTrouves.nom + ' ' + colleguesTrouves.prenom + ' (' + colleguesTrouves.dateDeNaissance + ')');
                    i++;
                    if (i === tableCollegue) {
                        start();
                    }
                });
            });
        });
    })
}

function ajouterCollegue() {
    var collegueAAjouter = {};
    rl.question('Nom  : ', function (nom) {
        collegueAAjouter.nom = nom;
        rl.question('Prenom  : ', function (prenom) {
            collegueAAjouter.prenom = prenom;
            rl.question('Email  : ', function (email) {
                collegueAAjouter.email = email;
                rl.question('Date de naissance  : ', function (dateDeNaissance) {
                    collegueAAjouter.dateDeNaissance = dateDeNaissance;
                    rl.question('PhotoUrl  : ', function (photoUrl) {
                        collegueAAjouter.photoUrl = photoUrl;
                        service.creerCollegue(collegueAAjouter, function (res, body) {
                            lg(res);
                            lg(body);
                            start();
                        });
                    });
                });
            });
        });
    });
}

function modifierEmail() {
    var collegue = rechercherCollegues;
    if(collegue > 2){
        rl.question('Prenom  : ', function (prenom) {
    }
}

exports.start = start;