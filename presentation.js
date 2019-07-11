const lg = console.log;

// récupération du module `readline`
const readline = require('readline');
const service = require('./service');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Presentation {
    constructor() {
    }

    start() {
        lg('1. Recherhche un collègue par nom');
        lg('2. Créer un collègue');
        lg('3. Modifier l\'email');
        lg('4. Modifier la photo');
        lg('99. Sortir');
        // récupération de la saisie utilisateur
        rl.question('Votre choix : ')
            .then(saisie => {
                switch (saisie) {
                    case '1':
                        rechercherCollegues();
                        break;
                    case '2':
                        ajouterCollegue();
                        break;
                    case '3':
                        lg('Fonction non implémentée');
                        break;
                    case '4':
                        lg('Fonction non implémentée');
                        break;
                    case '99':
                        lg('Au revoir');
                        rl.close();
                        break;
                    default:
                        lg('Saisie invalide');
                        rl.close();
                        this.start();
                }
            });
    }

    //Recherche un collegue avec le nom et le matricule
    rechercherCollegues() {
        rl.question('Nom recherché : ')
            .then(saisie => {
                lg(`>> Recherche en cours du nom : ${saisie}`);
                return service.rechercherColleguesParNom(saisie)
            })
            .then(collegues => {
                lg(collegues)
                this.start();
            });
    }

    ajouterCollegue() {
        let collegueAAjouter = {};
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

    //Ajoute un collegue. L'user doit fournir toutes les infos sauf le matricule
    ajouterCollegue() {
        let collegueAAjouter = {};
        rl.question(' Nom : ')
            .then(nom => {
                collegueAAjouter.nom = nom;
                rl.question('Prenom : ')
                    .then(prenom => {
                        collegueAAjouter.prenom = prenom;
                        rl.question('Email : ')
                            .then(email => {
                                collegueAAjouter.email = email;
                                rl.question('Date de naissance : ')
                                    .then(dateDeNaissance => {
                                        collegueAAjouter.dateDeNaissance = dateDeNaissance;
                                        rl.question('Photo Url : ')
                                            .then(photoUrl => {
                                                collegueAAjouter.photoUrl = photoUrl;
                                                return creerCollegue(collegueAAjouter)
                                                    .then(collegueAAjouter => {
                                                        lg(collegueAAjouter)
                                                        this.start();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    }

    //Modifie l'email d'un collegue. Le collegue choisi est sélectionné avec son matricule
    modifierEmail() {
        let collegueAModifier = {};
        rl.question('>> Saisissez le matricule du collègue : ', (matricule) => {
            collegueAModifier.matricule = matricule;
            rl.question('>> Saisissez le nouvel e-mail du collègue : ', (email) => {
                collegueAModifier.email = email;
                service.modifierEmail(collegueAModifier);
                service.rechercherCollegueParMatricule(matricule, (collegueTrouve) => {
                    lg(`${collegueTrouve.nom}, ${collegueTrouve.prenoms}, '\nNouveau email :', ${collegue.email}`);
                    this.start();
                });
            });
        })
    }
    //Modifie l' url de la photo d'un collegue. Le collegue choisi est sélectionné avec son matricule
    modifierPhoto() {
        let collegueAModifier = {};
        rl.question('>> Saisissez le matricule du collègue : ', (matricule) => {
            collegueAModifier.matricule = matricule;
            rl.question('>> Saisissez le nouvel url de la photo du collègue : ', (photoUrl) => {
                collegueAModifier.photoUrl = photoUrl;
                service.modifierPhotoUrl(collegueAModifier);
                service.rechercherCollegueParMatricule(matricule, (collegueTrouve) => {
                    lg(`${collegueTrouve.nom}, ${collegueTrouve.prenoms}, '\nNouvel Url de la photo :', ${collegue.photoUrl}`);
                    this.start();
                });
            });
        })
    }

}

exports.start = start;