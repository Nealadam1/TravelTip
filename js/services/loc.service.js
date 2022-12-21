export const locService = {
    getLocs,
    addLocs,
    reverseGeoLocation

}

const GEO_API_KEY = 'AIzaSyAevI53v770_CGbP6sLCj0HMLGMQmiDj7E'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 200)
    })
}

function addLocs(name, lat, lng) {
    // console.log(lat, lng)
    let newLoc = { name, lat, lng }
    locs.push(newLoc)
    // console.log(locs)
}

function reverseGeoLocation({ lat, lng }) {
    // console.log(lat, lng);
    const GEO_API_KEY = 'AIzaSyAevI53v770_CGbP6sLCj0HMLGMQmiDj7E'
    let geoLocation = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEO_API_KEY}`
    // console.log(geoLocation);
    return fetch(geoLocation).then(res => res.json())
        .then(res => {
            let address = res.results[0].formatted_address
            address = address.split('+')

            if (address.length > 1) {
                address = address[1]
                address = address.slice(3, address.length)
                addLocs(address, lat, lng)
                // console.log(locs)
                if (!address) {
                    console.log(address);
                    return 'unknown'
                }
                return address
            } else {
                addLocs(address.join(' '), lat, lng)
                // console.log(locs)
                if (!address) {
                    console.log(address);
                    return 'unknown'
                }
                return address.join(' ')
            }

        })

}

function getLocationByStr() {

}