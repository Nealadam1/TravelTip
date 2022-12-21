import { storageService } from './services/async-storage.service.js'
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDeleteMarker = onDeleteMarker
window.onPanToMarker = onPanToMarker
window.onSubmitText = onSubmitText
window.onMarkerPlacement = onMarkerPlacement

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
            setTimeout(() => {
                renderOnLoadMarkers()
                renderMarkers()
            }, 200);
        })
        .catch(() => console.log('Error: cannot init map'))

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
    renderOnLoadMarkers()
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            document.querySelector('.copy-location span').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            // console.log('User position is:', pos.coords)
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            // document.querySelector('.user-pos').innerText =
            // `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`

            const params = new URLSearchParams();
            params.set('lat', pos.coords.latitude);
            params.set('long', pos.coords.longitude);
            const url = `${window.location.href}?${params}`;
            history.replaceState({}, '', url);
            console.log(url);
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onPanToMarker(id) {
    let selectedMarker = placeService.get(id)
    selectedMarker.then(marker => mapService.panTo(marker.latLng))
    renderOnLoadMarkers()
}

function onMarkerPlacement() {
    if (mapService.placeMarker()) renderOnLoadMarkers()
}

function renderOnLoadMarkers() {
    placeService.query()
        .then(places => {
            const strHTMLs = []
            places.map(place =>
                strHTMLs.push(
                    `<li>Name: ${place.name} 
                    Location:${place.latLng.lat},${place.latLng.lng},
                    Created at: ${place.createdAt}, 
                    Updated at: ${place.updatedAt}
                    <button onclick="onPanToMarker('${place.id}')">Go</button>
                    <button onclick="onDeleteMarker('${place.id}')">Delete</button>
                    `)
            )
            document.querySelector('.locations-container ul').innerHTML = strHTMLs.join('')
        })

}

function onDeleteMarker(id) {
    placeService.remove(id)
    onInit()
}

function renderMarkers() {
    placeService.query()
        .then(markers => markers.forEach(marker => mapService.addMarker(marker.latLng)))
    renderOnLoadMarkers()
}

function onSubmitText(ev) {
    ev.preventDefault()

    let searchStr = document.querySelector('.location-input').value
    mapService.getLocationByStr(searchStr)
    let elMarkerLocation = document.querySelector('.locations-container ul').innerHTML
    renderOnLoadMarkers()
    console.log(elMarkerLocation);
}