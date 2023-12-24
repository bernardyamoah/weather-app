import { fetchWeatherApi } from 'openmeteo';


export async function fetchWeatherData(lon: number, lat: number) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude={lon}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto&forecast_minutely_15=24`;
    const params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "weather_code"],
        "hourly": ["temperature_2m", "weather_code"],
        "daily": ["weather_code", "temperature_2m_max"],
        "timezone": "auto",
        "forecast_hours": 6
    };

    const responses = await fetchWeatherApi(url, params);

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;


    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            weatherCode: current.variables(1)!.value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            weatherCode: hourly.variables(1)!.valuesArray()!,
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
        },

    };
    console.log(weatherData)
    return weatherData

}