export const mapService = {
    initMap,
    addMarker,
    panTo
}

import { placeService } from './place.service.js'
import { locService } from './loc.service.js'

// Var that is used throughout this Module (not global)
var gMap
let gMarkCoords

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })

            gMap.addListener('click', mapMouseEvent => {
                let latMark = mapMouseEvent.latLng.lat()
                let lngMark = mapMouseEvent.latLng.lng()
                let markLoc = { lat: latMark, lng: lngMark }
                gMarkCoords = markLoc
                addMarker(markLoc)
                locService.addLocs(markLoc)
            })
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function reverseGeoLocation() {
    let { lat, lng } = gMarkerLoc
    const GEO_API_KEY = 'AIzaSyAevI53v770_CGbP6sLCj0HMLGMQmiDj7E'
    const geoLocation = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEO_API_KEY}`
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBJt0y52EfTaGx2Km5u6-0eSxrn9OfnbPI' //DONE: Enter your API Key
    const GEO_API_KEY = 'AIzaSyAevI53v770_CGbP6sLCj0HMLGMQmiDj7E'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}