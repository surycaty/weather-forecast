

const WeatherModel = {

    id: Number,
    name: String,
    cod: Number,
    country: String,
    country_id: Number,
    sunrise: Number,
    sunset: Number,
    date: Number,
    weather: {
        id: Number,
        main: String,
        description: String,
        temp: Number,
        pressure: Number,
        humidity: Number,
        temp_min: Number,
        temp_max: Number,
        visibility: Number,
    },
}