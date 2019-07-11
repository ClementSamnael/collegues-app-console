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
        let service = this;
        return this.request(`https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue=${nomRechercher}`, { json: true })
            .then(matricule => {
                return Promise.all(matricule.map(unMatricule => service.recherhcherCollegueParMatricule(unMatricule)));
            });
    }

    recherhcherCollegueParMatricule(matricule) {
        return this.request(`https://clementsamnael-collegue-api.herokuapp.com/collegues/${matricule}`, { json: true });
    }

    /*  creerCollegue(collegue) {
         request.post(`https://clementsamnael-collegue-api.herokuapp.com/collegues`, {
             json: true, body: {
                 'nom': collegue.nom,
                 'prenom': collegue.prenom,
                 'email': collegue.email,
                 'dateDeNaissance': collegue.dateDeNaissance,
                 'photoUrl': collegue.photoUrl
             }
         });
     } */

    creerCollegue(collegue) {
        return this.request.post(`https://clementsamnael-collegue-api.herokuapp.com/collegues`, { json: true, body: collegue });
    }

    //Modification d'un USer
    /*  modifierEmail(matricule, email, callback) {
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
     } */

    mofidifierEmail(collegue) {
        return request.patch(`https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues/${matricule}`, { json: true, body: collegue })
    }

    modifierPhotoUrl(collegue) {
        return request.patch(`https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues/${matricule}`, { json: true, body: collegue })
    }
}

exports.rechercherColleguesParNom = rechercherColleguesParNom;
exports.recherhcherCollegueParMatricule = recherhcherCollegueParMatricule;
exports.creerCollegue = creerCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhotoUrl = modifierPhotoUrl;