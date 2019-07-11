import Service from './service';
import { Collegue } from './domain';


const lg = console.log;
// récupération du module `readline`
const readline = require('readline');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export default class Presentation {

    private service: Service;

    constructor() {
        this.service = new Service();
    }


    start(): void {
        lg(`1. Recherhche un collègue par nom
        2. Créer un collègue
        3. Modifier l\'email
        4. Modifier la photo
        99. Sortir`);
        rl.question('Votre choix ? : ', (saisie: string) => {
            switch (saisie) {
                case '1':
                    this.rechercherCollegues();
                    break;
                case '2':
                    this.ajouterCollegue();
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
                    lg('Saisie invalide');
                    rl.close();
                    this.start();
            }
        });
    }

    //Recherche un collegue avec le nom et le matricule
    rechercherCollegues(): void {
        rl.question('Nom recherché : ')
            .then((saisie: string) => {
                lg(`>> Recherche en cours du nom : ${saisie}`);
                return this.service.rechercherColleguesParNom(saisie)
            })
            .then((collegues: string) => {
                lg(collegues)
                this.start();
            });
    }

    //Ajoute un collegue. L'user doit fournir toutes les infos sauf le matricule
    ajouterCollegue(): void {
        //Tableau d'un collegue réunissant toutes ses infos
        let parametre: any = {};
        rl.question('Nom : ')
            .then((nom: string) => {
                parametre.nom = nom
                return rl.question('Prenom : ')
                    .then((prenom: string) => {
                        parametre.prenom = prenom;
                        return rl.question('Email : ')
                            .then((email: string) => {
                                parametre.email = email;
                                return rl.question('Date de naissance : ')
                                    .then((dateDeNaissance: string) => {
                                        parametre.dateDeNaissance = dateDeNaissance;
                                        return rl.question('Photo Url : ')
                                            .then((photoUrl: string) => {
                                                parametre.photoUrl = photoUrl;
                                                let collegue = new Collegue(parametre.nom, parametre.prenom, parametre.email, parametre.dateDeNaissance, parametre.photoUrl);
                                                return this.service.creerCollegue(collegue)
                                                    .then((collegueAAjouter: Collegue) => {
                                                        lg(collegue)
                                                        this.start();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    }

    //Modifie l'email d'un collegue. Le collegue choisi est sélectionné avec son matricule
    /*  modifierEmail():void {
         let collegueAModifier: Collegue;
         rl.question('>> Saisissez le matricule du collègue : ', (matricule: string) => {
             collegueAModifier.matricule = matricule;
             rl.question('>> Saisissez le nouvel e-mail du collègue : ', (email: string) => {
                 collegueAModifier._email = email;
                 this.service.modifierEmail(matricule,email);
                 this.service.rechercherCollegueParMatricule(matricule, (collegueTrouve: Collegue) => {
                     lg(`${collegueTrouve.nom}, ${collegueTrouve.prenom}, '\nNouveau email :', ${collegueTrouve.email}`);
                     this.start();
                 });
             });
         })
     } */
    //Modifie l' url de la photo d'un collegue. Le collegue choisi est sélectionné avec son matricule
    /* modifierPhoto():void {
        let collegueAModifier: Collegue;
        rl.question('>> Saisissez le matricule du collègue : ', (matricule: string) => {
            collegueAModifier.matricule = matricule;
            rl.question('>> Saisissez le nouvel url de la photo du collègue : ', (photoUrl: string) => {
                collegueAModifier.photoUrl = photoUrl;
                this.service.modifierPhotoUrl(collegueAModifier);
                this.service.rechercherCollegueParMatricule(matricule, (collegueTrouve: Collegue) => {
                    lg(`${collegueTrouve.nom}, ${collegueTrouve.prenom}, '\nNouvel Url de la photo :', ${collegueTrouve.photoUrl}`);
                    this.start();
                });
            });
        })
    } */

}