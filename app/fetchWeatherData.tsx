import { fetchWeatherApi } from 'openmeteo';


export async function fetchWeatherData(lon: number, lat: number) {

    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "apparent_temperature", "is_day", "weather_code", "wind_speed_10m"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "weather_code"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "precipitation_probability_max"],
        "timezone": "GMT",
        "past_days": 3,
        "forecast_hours": 6
    };

    const responses = await fetchWeatherApi(url, params);


    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            apparentTemperature: current.variables(1)!.value(),
            isDay: current.variables(2)!.value(),
            weatherCode: current.variables(3)!.value(),
            precipitation: current.variables(0)!.value(),
            windSpeed10m: current.variables(1)!.value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
            dewPoint2m: hourly.variables(2)!.valuesArray()!,
            apparentTemperature: hourly.variables(3)!.valuesArray()!,
            weatherCode: hourly.variables(4)!.valuesArray()!,
        },
    
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
            apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
            sunrise: daily.variables(5)!.valuesArray()!,
            sunset: daily.variables(6)!.valuesArray()!,
            daylightDuration: daily.variables(7)!.valuesArray()!,
            sunshineDuration: daily.variables(8)!.valuesArray()!,
            precipitationProbabilityMax:daily.variables(9)!.valuesArray()!,
        },
    };


    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // for (let i = 0; i < weatherData.hourly.time.length; i++) {
    //     console.log(
    //         weatherData.hourly.time[i].toISOString(),
    //         weatherData.hourly.temperature2m[i],
    //         weatherData.hourly.apparentTemperature[i],
    //         weatherData.hourly.precipitation[i],
    //         weatherData.hourly.weatherCode[i],
    //         weatherData.hourly.visibility[i],
    //         weatherData.hourly.windSpeed10m[i]
    //     );
    // }
    // for (let i = 0; i < weatherData.daily.time.length; i++) {
    //     console.log(
    //         weatherData.daily.time[i].toISOString(),
    //         weatherData.daily.temperature2mMax[i],
    //         weatherData.daily.apparentTemperatureMax[i],
    //         // weatherData.daily.sunrise[i],
    //         // weatherData.daily.sunset[i],
    //         weatherData.daily.daylightDuration[i],
    //         weatherData.daily.sunshineDuration[i],
    //         weatherData.daily.uvIndexMax[i],
    //         weatherData.daily.uvIndexClearSkyMax[i]
    //     );
    // }
    // console.log(weatherData.daily.sunrise)
    return weatherData;

}
