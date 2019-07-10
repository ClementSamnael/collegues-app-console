var lg = console.log;

var request = require('request');

function rechercherColleguesParNom(nomRechercher, callback) {
    request('https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue=' + nomRechercher, { json: true }, function (errr, res, body) {
        var tableauColleguesTrouves = body;
        callback(tableauColleguesTrouves);
    });
    //La fonction ne retourne rien (pas de return)
}


function recherhcherCollegueParMatricule(matricule, callback) {
    request('https://clementsamnael-collegue-api.herokuapp.com/collegues/' + matricule, { json: true }, function (errr, res, body) {
        var matriculeTrouves = body;
        callback(matriculeTrouves);
    });
}

function creerCollegue(collegue, callback) {
    request.post('https://clementsamnael-collegue-api.herokuapp.com/collegues', {
        json: true, body: {
            'nom': collegue.nom,
            'prenom': collegue.prenom,
            'email': collegue.email,
            'dateDeNaissance': collegue.dateDeNaissance,
            'photoUrl': collegue.photoUrl
        }
    }, function (errr, res, body) {
        callback(res, body);
    });
}

function modifierCollegue(matricule, collegue, callback) {
    request.patch('https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues' + matricule, {
        json: true, body: {
            'email': collegue.email,
            'photoUrl': collegue.photoUrl
        }
    }, function (errr, res, body) {
        var matriculeTrouves = body;
        callback(res, body);
    });

}


exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.recherhcherCollegueParMatricule = recherhcherCollegueParMatricule;
exports.creerCollegue = creerCollegue;
exports.modifierCollegue = modifierCollegue;