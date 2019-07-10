var lg= console.log;

// récupération du module `readline`
var readline = require('readline');
var service = require('./service');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start(){
    lg("1. Recherhche un collègue par nom");
    lg("99. Sortir");
    // récupération de la saisie utilisateur
    rl.question('Votre choix : ', function(saisie) {
        switch(saisie){
            case '1' :
                rechercherCollegues();
                break;
            case '99' :
                lg("Aurevoir");
                rl.close();
                break;
            default : 
                rl.close();
                break;
        }   
    });
}   

function rechercherCollegues(){
    rl.question('Nom recherché : ', function(saisie) {
        var tableCollegue;
        var i = 0;
        service.rechercherColleguesParNom(saisie, function(colleguesTrouves){
            lg('>> Recherche en cours du nom ' + saisie);
            lg(colleguesTrouves);
            tableCollegue = colleguesTrouves.length;
            colleguesTrouves.forEach(function(element){
                service.recherhcherCollegueParMatricule(element, function(colleguesTrouves){
                    lg(colleguesTrouves.nom + ' ' + colleguesTrouves.prenom + ' (' + colleguesTrouves.dateDeNaissance + ')');
                    i++;
                    if(i === tableCollegue){
                        start();
                    }
                 });
            });
        });
    })
}


exports.start = start;