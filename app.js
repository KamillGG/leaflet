var map = L.map('map',{dragging:false}).setView([52.186858,21.572491], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var pigeonIcon = L.icon({
    iconUrl: 'pigeon.png',

    iconSize:     [38, 50], // size of the icon
    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
});
var budowlana = L.marker([52.186858,21.572491],{icon:pigeonIcon}).addTo(map)
    .bindPopup('Szkola')
    .openPopup();

map.on('click', function(e){
    console.log(e.latlng)
    marker(e.latlng)
    
    // getData(e.latlng)
});
// async function getData(latlng){
//     const lng = latlng.lng
//     const lat = latlng.lat
//     console.log(lng)
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&namedetails=1`
//     const json = await fetch(url).then(response => response.json())
//     console.log(json.address.county)
// }
function marker(latlng){
    var from = budowlana.getLatLng()
    var znacznik = L.marker([latlng.lat,latlng.lng]).addTo(map)
    var to = znacznik.getLatLng()
    var odleglosc = from.distanceTo(to).toFixed(0)/1000 + "km"
    L.polyline([from,to],{color:"red"}).addTo(map).bindTooltip(odleglosc, {permanent: true});
    
}
var geojsonFeature = powiaty.features
powiaty.features.forEach((feature) => {
    if(feature.properties.nazwa =="powiat miński" ){
        var geojson = L.geoJSON(feature,{color:"red"}).addTo(map)
        geojson.bindTooltip(feature.properties.nazwa)
    }
    else{
        geojson = L.geoJSON(feature,).addTo(map).bindTooltip(feature.properties.nazwa)
    }
    geojson.on('click',function(){
        geojson.setStyle({
            color:"red",
            fillColor:"red"
        })
    })
})
