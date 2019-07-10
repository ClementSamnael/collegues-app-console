const request = require('request-promise-native');

class Service {

    /* rechercherColleguesParNom(nomRechercher, callback) {
        request(`https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue=${nomRechercher}`, { json: true }, function (errr, res, body) {
            let tableauColleguesTrouves = body;
            callback(tableauColleguesTrouves);
        });
        //La fonction ne retourne rien (pas de return)
    } */

    rechercherColleguesParNom(nomRecherhcer) {
        return request(`https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue=${nomRechercher}`, { json: true }
            .then(matricule => {
                return Promise.all(matricule.map(unMatricule => request(`https://clementsamnael-collegue-api.herokuapp.com/collegues/${unMatricule}`), { json: true }))
            }));
    }

    recherhcherCollegueParMatricule(matricule, callback) {
        request(`https://clementsamnael-collegue-api.herokuapp.com/collegues/${matricule}`, {json: true }, function (errr, res, body) {
            let matriculeTrouves = body;
            callback(matriculeTrouves);
        });
    }

    creerCollegue(collegue) {
        request.post(`https://clementsamnael-collegue-api.herokuapp.com/collegues`, {
            json: true, body: {
                'nom': collegue.nom,
                'prenom': collegue.prenom,
                'email': collegue.email,
                'dateDeNaissance': collegue.dateDeNaissance,
                'photoUrl': collegue.photoUrl
            }
        });
    }

    modifierEmail(matricule, email, callback) {
        request.patch(`https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues/${matricule}`, {
            json: true, body: {
                'email': email
            }
        }, function (errr, res, body) {
            let matriculeTrouves = body;
            callback(res, body);
        });
    }

    modifierPhotoUrl(matricule, photoUrl, callback) {
        request.patch(`https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues/${matricule}`, {
            json: true, body: {
                'photoUrl': photUrl
            }
        }, function (errr, res, body) {
            let matriculeTrouves = body;
            callback(res, body);
        });
    }

}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.recherhcherCollegueParMatricule = recherhcherCollegueParMatricule;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhotoUrl = modifierPhotoUrl;