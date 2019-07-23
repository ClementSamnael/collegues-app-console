import request from 'request-promise-native';
import Collegue from './domain';

export default class Service {
    modifierEmail(matricule: string, email: string) {
        throw new Error("Method not implemented.");
    }

    async rechercherColleguesParNom(nomRechercher: string): Promise<Collegue[]> {
        let service = this;
        const matricule = await request(`https://clementsamnael-collegue-api.herokuapp.com/collegues?nomCollegue=${nomRechercher}`, { json: true });
        return Promise.all(matricule.map((unMatricule: string) => service.rechercherColleguesParNom(unMatricule)));
    }

    rechercherCollegueParMatricule(matricule: string) {
        return request(`https://clementsamnael-collegue-api.herokuapp.com/collegues/${matricule}`, { json: true });
    }

    creerCollegue(collegue: Collegue) {
        return request.post(`https://clementsamnael-collegue-api.herokuapp.com/collegues`, { json: true, body: collegue });
    }

    /*  modifierEmail(matricule:string, email: string) {
         return request.patch(`https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues/${matricule}`, { json: true, body: email })
     } */

    /*  modifierPhotoUrl(matricule:string, photorul: string) {
      return request.patch(`https://clementsamnael-collegue-api.herokuapp.com/collegues/collegues/${matricule}`, { json: true, body: photorul })
    }  */

    authentifier(login: string, motDePasse: string) {
        return request.post(`https://clementsamnael-collegue-api.herokuapp.com/collegues/auth`, { json: true, body:{
            "login" : login,
            "motDePasse" : motDePasse
        } })
    }

}
