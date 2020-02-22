
export default class WeatherModel {

    id = String;
    name = String;
    cod = Number;
    country = String;
    country_id = Number;
    sunrise = Number;
    sunset = Number;
    date = Number;
    weather = {
        id: Number,
        main: String,
        description: String,
        temp: Number,
        pressure: Number,
        humidity: Number,
        temp_min: Number,
        temp_max: Number,
        visibility: Number,
    };

    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.weather.main = json.weather[0].main;
        this.weather.temp = Math.round(json.main.temp);
        this.weather.temp_min = Math.round(json.main.temp_min);
        this.weather.temp_max = Math.round(json.main.temp_max);
    } 
}