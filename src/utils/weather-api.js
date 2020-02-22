import { ENDPOINT_API, ENDPOINT_API_GROUP } from "./weather-api-key";

export class WeatherAPI {

    getEndpointCurrentLocation(lat, lon) {
        return `${ENDPOINT_API}lat=${lat}&lon=${lon}`
    }

    getEndpointCities(cities) {
        return `${ENDPOINT_API_GROUP}id=${cities}`
    }

}