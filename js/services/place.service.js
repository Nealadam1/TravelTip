export const placeService = {

}
import { locService } from './loc.service.js'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PLACES_KEY = 'placesDB'

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
    place.updatedAt



}

function getEmptyPlace(name = '', lat = 32, latLng = { lat: 32, lng: 32 }) {
    return { id: '', name, latLng }
}



function remove() {

}