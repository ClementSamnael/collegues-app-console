import Service from './service';
import Collegue from './domain';
import readline from 'readline';

const lg = console.log;
const service = new Service();
// récupération du module `readline`


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start(){
    authentifier();
}

    function menu() {
        lg(`1. Recherhche un collègue par nom
        2. Créer un collègue
        3. Modifier l\'email
        4. Modifier la photo
        99. Sortir`);
        rl.question('Votre choix ? : ', (saisie: string) => {
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
                    lg('Saisie invalide');
                    menu();
            }
        });
    }

    //Recherche un collegue avec le nom et le matricule
    function rechercherCollegues() {
        rl.question('Nom recherché : ', (saisie: string) => {
            lg(`>> Recherche en cours du nom : ${saisie}`);
            service.rechercherColleguesParNom(saisie)
                .then((collegueTrouve: Collegue[]) => {
                    collegueTrouve.forEach((collegue: Collegue) => {
                        lg((`Nom : ${collegue.nom} // Prénom : ${collegue.prenom} // Date de Naissance : ${collegue.dateDeNaissance}`))
                        menu();
                    })
                })
                .catch((error: any) => console.log(error));
        });
    }

    //Ajoute un collegue. L'user doit fournir toutes les infos sauf le matricule
   function ajouterCollegue(): void {
        //Tableau d'un collegue réunissant toutes ses infos
        let collegue = new Collegue();
        rl.question('Nom : ', function (saisie) {
            collegue.nom = saisie
            return rl.question('Prenom : ', function (saisie) {
                collegue.prenom = saisie;
                return rl.question('Email : ', function (saisie) {
                    collegue.email = saisie;
                    return rl.question('Date de naissance : ', function (saisie) {
                        collegue.dateDeNaissance = saisie;
                        return rl.question('Photo Url : ', function (saisie) {
                            collegue.photoUrl = saisie;
                            service.creerCollegue(collegue)
                                .then((body) => {
                                    lg(body);
                                    menu();
                                })
                                .catch((err) => {
                                    lg('Création impossible')
                                });
                        })
                    });
                });
            });
        });
    }
    function authentifier() {
        rl.question('>> Veuillez saisir votre nom d\'utilisateur : ', (login:string) =>{
            rl.question('>> Veuillez saisir votre mot de passe : ', (motDePasse:string) => {
                service.authentifier(login, motDePasse)
                .then(() => {;
                    lg('Authentification réussie !');
                    menu();
                })
                .catch((err) => {
                    lg('Le nom d\'utilisateur/mot de passe saisi est invalide, veuillez recommencer.');
                    authentifier();
                });
            });       
        });
    }

    //Modifie l'email d'un collegue. Le collegue choisi est sélectionné avec son matricule
    /* function modifierEmail():void {
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
    /* function modifierPhoto():void {
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
export {start};
