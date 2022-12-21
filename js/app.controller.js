import { storageService } from './services/async-storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDeleteMarker = onDeleteMarker
window.onPanToLastMarker = onPanToLastMarker

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    setTimeout(() => {
        renderOnLoadMarkers()
    }, 3000);
    renderMarkers()

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onPanToLastMarker() {
    const places = placeService.query()
}

function renderOnLoadMarkers() {
    const places = placeService.query()
        .then(places =>
            places.map(place => {
                // console.log(place)
                const strHTMLs = `<li>Name: ${place.name} Location:${place.latLng.lat},${place.latLng.lng} Created at: ${place.createdAt}, Updated at: ${place.updatedAt}`
                // console.log(strHTMLs)
            }
            ))
}

function onDeleteMarker(id) {
    const places = placeService.query()
    placeService.remove(id)
    mapService.initMap()
    // .then(places => {
    //     console.log(places[places.length - 1].id);
    //     placeService.remove(places[places.length - 1].id)
    //     renderMarkers()
    // })
}

function renderMarkers() {
    placeService.query()
        .then(markers => markers.forEach(marker => mapService.addMarker(marker.latLng)))
}