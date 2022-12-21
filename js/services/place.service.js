export const placeService = {

}
import { utilService } from './services/utilService.js'

const PLACES_KEY = 'placesDB'


function _createPlace(name) {
    const place = getEmptyPlace()
    place.id = utilService.makeId()
    place.name = name
    place.latLng = getLatLng()

}

function getEmptyPlace(name = '', lat = 32, latLng = { lat: 32, lng: 32 }) {
    return { id: '', name, latLng }
}

function getLatLng(

)