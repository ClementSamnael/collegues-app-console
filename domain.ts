export default class Collegue {
    private _matricule:string;
    private _nom:string;
    private _prenom:string;
    private _email:string;
    private _dateDeNaissance:string;
    private _photoUrl:string;
    prenom: any;

    constructor() {
        this._matricule = '';
        this._nom = '';
        this._prenom = '';
        this._email = '';
        this._dateDeNaissance = '';
        this._photoUrl = '';
    }

    get matricule() {
        return this._matricule;
    }
    get nom() {
        return this._nom;
    }
    get prenoms() {
        return this._prenom;
    }
    get email() {
        return this._email;
    }
    get dateDeNaissance() {
        return this._dateDeNaissance;
    }
    get photoUrl() {
        return this._photoUrl;
    }

    set matricule(matricule:string) {
        this._matricule = matricule;
    }
    set nom(nom:string) {
        this._nom = nom;
    }
    set prenoms(prenom:string) {
        this._prenom = prenom;
    }
    set email(email:string) {
        this._email = email;
    }
    set dateDeNaissance(dateDeNaissance:string) {
        this._dateDeNaissance = dateDeNaissance;
    }
    set photoUrl(photoUrl:string) {
        this._photoUrl = photoUrl;
    }
}