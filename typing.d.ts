interface Current {
  
  is_day: number
  precipitation: number
  rain: number
  showers: number
  snowfall: number
  temperature_2m: string
  time: string
  weather_code: number
  wind_speed_10m: string
}

interface CurrentUnits {
  apparent_temperature: string
  interval: string
  is_day: string
  precipitation: string
  rain: string
  showers: string
  snowfall: string
  temperature_2m: string
  time: string
  weather_code: string
  wind_speed_10m: string
}

interface Daily {
  daylight_duration: [string]
  et0_fao_evapotranspiration: [string]
  precipitation_hours: [number]
  precipitation_probability_max: [number]
  precipitation_sum: [string]
  rain_sum: [string]
  shortwave_radiation_sum: [string]
  showers_sum: [string]
  sunrise: [string]
  sunset: [string]
  sunshine_duration: [string]
  temperature_2m_max: [string]
  time: [string]
  uv_index_clear_sky_max: [string]
  uv_index_max: [string]
  weather_code: [number]
  wind_speed_10m_max: [string]
}

interface DailyUnits {
  daylight_duration: string
  et0_fao_evapotranspiration: string
  precipitation_hours: string
  precipitation_probability_max: string
  precipitation_sum: string
  rain_sum: string
  shortwave_radiation_sum: string
  showers_sum: string
  sunrise: string
  sunset: string
  sunshine_duration: string
  temperature_2m_max: string
  time: string
  uv_index_clear_sky_max: string
  uv_index_max: string
  weather_code: string
  wind_speed_10m_max: string
}

interface Hourly {
  apparent_temperature: [string]
  cloud_cover_high: [number]
  is_day: [number]
  precipitation_probability: [number]
  rain: [string]
  relative_humidity_2m: [number]
  snowfall: [string]
  sunshine_duration: [string]
  surface_pressure: [string]
  temperature_2m: [string]
  temperature_80m: [string]
  time: [string]
  uv_index: [string]
  uv_index_clear_sky: [string]
  visibility: [number]
  weather_code: [number]
  wind_direction_10m: [number]
  wind_direction_80m: [number]
  wind_speed_10m: [string]
  wind_speed_80m: [string]
}

interface HourlyUnits {
  apparent_temperature: string
  cloud_cover_high: string
  is_day: string
  precipitation_probability: string
  rain: string
  relative_humidity_2m: string
  snowfall: string
  sunshine_duration: string
  surface_pressure: string
  temperature_2m: string
  temperature_80m: string
  time: string
  uv_index: string
  uv_index_clear_sky: string
  visibility: string
  weather_code: string
  wind_direction_10m: string
  wind_direction_80m: string
  wind_speed_10m: string
  wind_speed_80m: string
}

interface Minutely15 {
  rain: [number]
  temperature_2m: [string]
  time: [string]
  weather_code: [number]
}

interface Minutely15Units {
  rain: string
  temperature_2m: string
  time: string
  weather_code: string
}

interface Root {
  current: Current
  current_units: CurrentUnits
  daily: Daily
  daily_units: DailyUnits

  hourly: Hourly
  hourly_units: HourlyUnits
  
  minutely_15: Minutely15
  minutely_15_units: Minutely15Units

}

