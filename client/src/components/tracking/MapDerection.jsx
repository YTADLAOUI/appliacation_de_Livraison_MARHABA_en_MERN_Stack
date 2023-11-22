import { useEffect } from "react"
import L from "leaflet"
import { useMap } from "react-leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

const MapDerection = () => {
    const map = useMap();
    let dMark = L.icon({
        iconUrl:"images/Dman.png",
        iconSize: [50,50]
    });
    let homeMark = L.icon({
        iconUrl:"images/home.png",
        iconSize: [40,40]
    });
    
    useEffect(()=>{
        let deliveryMark = L.marker([32.559, -7.5332], {icon: dMark}).addTo(map);
       map.on("click", function(e){
        L.marker([e.latlng.lat, e.latlng.lng], {icon: homeMark}).addTo(map)
        L.Routing.control({
            waypoints:[
                // L.latLng(e.latlng.lat, e.latlng.lng), L.latLng()
                L.latLng(32.559, -7.5332),
                L.latLng(e.latlng.lat, e.latlng.lng)
            ],
            routeWhileDragging: false,
            geocoder: L.Control.Geocoder.nominatim(),
            fitSelectedRoutes: false,
            showAlternatives: true
          })
          .on("routesfound", function(e){
            e.routes[0].coordinates.forEach((c, i) => {
                setTimeout(()=>{
                    deliveryMark.setLatLng([c.lat, c.lng])
                },100*i)
            });
          })
          .addTo(map);
       })
    },[])
  return null
}

export default MapDerection