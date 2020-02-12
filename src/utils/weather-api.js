import { ENDPOINT_API } from "./weather-api-key";

export class WeatherAPI {

    getEndpointCurrentLocation(lat, lon) {
        return `${ENDPOINT_API}lat=${lat}&lon=${lon}`
    }

    getEndpointCities(cities) {
        return `${ENDPOINT_API}id=${cities}`
    }

}