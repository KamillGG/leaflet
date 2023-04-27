var map = L.map('map',{dragging:false}).setView([52.186858,21.572491], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var budowlana = L.marker([52.186858,21.572491]).addTo(map)
    .bindPopup('Szkola')
    .openPopup();

map.on('click', function(e){
    console.log(e.latlng)
    marker(e.latlng)
    
    //getData(e.latlng)
});
// async function getData(latlng){
//     const lng = latlng.lng
//     const lat = latlng.lat
//     console.log(lng)
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//     const data = await fetch(url).then(response => response.json())
//     console.log(data)
// }
function marker(latlng){
    var from = budowlana.getLatLng()
    var znacznik = L.marker([latlng.lat,latlng.lng]).addTo(map)
    var to = znacznik.getLatLng()
    var odleglosc = from.distanceTo(to).toFixed(0)/1000 + "km"
    L.polyline([from,to],{color:"red"}).addTo(map).bindTooltip(odleglosc, {permanent: true});
    
}