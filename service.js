var lg = console.log;

var request = require('request');

function rechercherColleguesParNom(nomRechercher, callback){
    request('https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue='+ nomRechercher, {json: true}, function(errr, res,body){
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
    //La fonction ne retourne rien (pas de return)
}


function recherhcherCollegueParMatricule(matricule, callback){
    request('https://clementsamnael-collegue-api.herokuapp.com/collegues/'+matricule, {json: true}, function(errr, res,body){
        var matriculeTrouves = body;
        callback(matriculeTrouves);
    });
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.recherhcherCollegueParMatricule = recherhcherCollegueParMatricule;