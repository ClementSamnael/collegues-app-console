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
                rl.question('Nom recherché : ', function(saisie) {
                    service.rechercherColleguesParNom(saisie, function(colleguesTrouves){
                        lg('>> Recherche en cours du nom ' + saisie);
                        lg(colleguesTrouves);
                    });
                    rl.close();
                });
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

exports.start = start;