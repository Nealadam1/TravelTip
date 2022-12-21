
import { locService } from './loc.service.js'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const placeService = {
    query,
    get,
    remove,
    save,
    getEmptyPlace,


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
    if (place.id) {
        return storageService.put(PLACES_KEY, place)
    } else {
        return storageService.post(PLACES_KEY, place)
    }
}

function getEmptyPlace(name = '', lat = 32, latLng = { lat: 32, lng: 32 }) {
    return { id: '', name, latLng }
}

_createPlace()
function _createPlace() {
    const place = getEmptyPlace()
    place.id = utilService.makeId()
    place.name = locService.getLocs().then(locs => locs[locs.length - 1].name)
    place.latLng = locService.getLocs().then(locs => {
        const { lat, lng } = locs[locs.length - 1]
        return { lat, lng }
    })

    place.createdAt = Date.now()
    place.updatedAt = Date.now() // ??


}

function _createPlaces() {
    let places = storageService.query(PLACES_KEY).then(places => {
        if (!places || !places.length) {
            _createDemoPlace('test')
            
        }
    }
    )


}

function _createDemoPlace(name) {
    const place =
        { id: 1, name: `${name}`, latLng: { lat: 32, lng: 32 }, createdAt: 202020, updatedAt: 202021 }
    storageService.post(PLACES_KEY, place)
}


