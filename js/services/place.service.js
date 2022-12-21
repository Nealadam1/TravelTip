
import { locService } from './loc.service.js'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const placeService = {
    query,
    get,
    remove,
    save,
    getEmptyPlace,
    addPlace
}

const PLACES_KEY = 'placesDB'
_createPlaces()

function query() {
    return storageService.query(PLACES_KEY)
}

function get(placeId) {
    return storageService.get(PLACES_KEY, placeId)
}

function remove(placeId) {
    return storageService.remove(PLACES_KEY, placeId)
}

function save(place) {
    return storageService.post(PLACES_KEY, place)
}

function addPlace() {
    let currPlace = _createPlace().then(placeMark => save(placeMark))
    console.log(currPlace);
}

function getEmptyPlace(name = '', lat = 32, latLng = { lat: 32, lng: 32 }) {
    return { id: '', name, latLng }
}

_createPlace()
function _createPlace() {
    const getData = locService.getLocs().then(locs => {
        let lastMarker = locs[locs.length - 1]

        const place = getEmptyPlace()
        place.id = utilService.makeId()
        place.name = lastMarker.name
        place.latLng = { lat: lastMarker.lat, lng: lastMarker.lng }
        place.createdAt = Date.now()
        place.updatedAt = Date.now() // ??
        return place

    })

    return getData
}

function _createPlaces() {
    let places = storageService.query(PLACES_KEY).then(places => {
        if (!places || !places.length) {
            _createDemoPlace('placeholder')

        }
    })


}

function _createDemoPlace(name) {
    const place =
        { id: 1, name: `${name}`, latLng: { lat: 32.78144, lng: 32.65245 }, createdAt: 202020, updatedAt: 202021 }
    storageService.post(PLACES_KEY, place)
}

