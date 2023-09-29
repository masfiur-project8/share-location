import { Map } from "./UI/Map";

class LoadedPlace {
    constructor(coordinates, address){
        new Map(coordinates)
        const headerTitleEl = document.querySelector('header h1')
        headerTitleEl.textContent = address
    }
}

//creates a new URL object 
//location.href property represents the current URL of the webpage
const url = new URL(location.href) 
const queryParams = url.searchParams //retrieves the query parameters from the URL
const coords = {
    //retrieves the value of the query parameter 
    lat: parseFloat(queryParams.get('lat')),
    lng: +queryParams.get('lng')
}
const address = queryParams.get('address')
new LoadedPlace(coords, address)