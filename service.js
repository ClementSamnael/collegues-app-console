var lg = console.log;

var request = require('request');

function rechercherColleguesParNom(nomRechercher, callback){
    request('https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue='+ nomRechercher, {json: true}, function(errr, res,body){
       console.log('https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue='+ nomRechercher);
        var tableauColleguesTrouves = body;
        
        callback(tableauColleguesTrouves);
    });
    //La fonction ne retourne rien (pas de return)
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;