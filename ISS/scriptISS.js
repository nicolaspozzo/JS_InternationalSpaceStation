

// Making a map and tiles
var mymap = L.map('mapid').setView([0, 0], 1)

const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png '

L.tileLayer(tilesProvider, {
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);

// Making a marker with a custom icon
var issIcon = L.icon({
    iconUrl:"iss.png",
    iconSize:[50,30],
    iconAnchor:[25,16]
})
const m = L.marker([0, 0],{icon:issIcon}, 12).addTo(mymap)



const api_url = "https://api.wheretheiss.at/v1/satellites/25544"

let firstTime = true
async function getISS() {
    const response = await fetch(api_url)
    const data = await response.json()
    const { latitude, longitude, altitude, velocity,
    visibility,units } = data

    m.setLatLng([latitude, longitude],1)
    if(firstTime){
       // mymap.setView([latitude,longitude],10)
        mymap.flyTo([latitude,longitude],4)
        firstTime = false;
    }
    // autotracking
    // mymap.flyTo([latitude,longitude],4)

    document.getElementById("lat").textContent = latitude.toFixed(4)
    document.getElementById("lon").textContent = latitude.toFixed(4)

    document.getElementById("alt").textContent = altitude.toFixed(4)
    document.getElementById("vel").textContent = velocity.toFixed(4)  
    document.getElementById("vis").textContent = visibility
    document.getElementById("uni").textContent = units
}

// getISS()
 setInterval("getISS()",1000)

// create a circle
// var mymap = L.map('mapid').setView([-31.416563, -64.183533], 12)

// var marker = L.marker([-31.416563, -64.183533], 10).addTo(mymap)
// var circle = L.circle([-31.416563, -64.183533], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);
