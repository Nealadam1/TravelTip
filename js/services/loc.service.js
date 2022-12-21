export const locService = {
    getLocs,
    addLocs
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLocs({ lat, lng }) {
    // console.log(lat, lng)
    let newLoc = { name: 'newMark', lat, lng }
    locs.push(newLoc)
    console.log(locs)
}

