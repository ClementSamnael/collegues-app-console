const lg = console.log;

//Variable let
let favoriteCityId = 'rome';
//lg(favoriteCityId);

favoriteCityId = 'paris';
//lg(favoriteCityId);

//Variable const
const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
//lg(citiesId);

//citiesId = [];
//lg(citiesId);

citiesId.push = 'tokyo';
//lg(citiesId);

//Création d'objet
function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;

    return { city, temperature };
}
//lg(getWeather('paris'));

const weather = getWeather(favoriteCityId);
//lg(weather);

const { city, temperature } = weather;
//lg(city);
//lg(temperature);

//Rest operator
const [parisId, nycId, ...othersCitiesId] = citiesId;
//lg(parisId);
//lg(nycId);
//lg(othersCitiesId.length);

//Classes
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this.price + ' ]';
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/paris.jpg')
    }
}

let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');
parisTrip._price = 100;
//lg(parisTrip);
//lg(parisTrip.name);
//lg(parisTrip.toString());
const defaultTrip = Trip.getDefaultTrip();
//lg(defaultTrip.toString());

//Héritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl, price) {
        super(id, name, imageUrl);
        this.price = 0;
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
//lg(freeTrip.toString());

//Promise, Set, Map, Arrow Function
class TripService {

    constructor() {
        // TODO Set of 3 trips
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                this.trips.forEach(trip => {
                    if (trip.name === tripName) {
                        resolve(trip);
                    }
                });
                reject('No trip with name ' + tripName)
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
            }, 2000)
        });
    }
}


class PriceService {

    constructor() {
        // TODO Map of 2 trips
        this.trips = new Map();
        this.trips.set('paris', { price: 100 });
        this.trips.set('rio-de-janeiro', { price: 800 });
        // 'paris' --> price = 100
        // 'rio-de-janeiro' --> price = 800)
        // no price for 'nantes'
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                // ici l'exécution du code est asynchrone
                if (this.trips.has(tripId)) {
                    resolve('Price found : ' + this.trips.price);
                } else {
                    reject('No price found for id ' + tripId);
                }
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

/* lg(tripService.findByName('Rio de Janeiro').then(trip => {
   lg('Trip found : ' + trip);
}).catch(function (err) {
   lg(err);
})
); */

/* lg(tripService.findByName('Toulouse').then(trip => {
    lg('Trip found : ' + trip);
}).catch(function (err) {
    lg(err);
})
);  */

/* lg(tripService.findByName('Rio de Janeiro').then(trip => {
    priceService.findPriceByTripId('rio-de-janeiro').then(price => {
        lg('Price found : ' + price);
    }).catch(function (err) {
        lg(err);
    })
})
); */

lg(tripService.findByName('Nantes').then(trip => {
    priceService.findPriceByTripId('nantes').then(price => {
        lg('Price found : ' + price);
    }).catch(function (err) {
        lg(err);
    })
})
);