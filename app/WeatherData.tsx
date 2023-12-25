import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react";
import { fetchWeatherData } from './fetchWeatherData';
import { formatTime } from "@/lib/formatTime";
import { Separator } from "@radix-ui/react-separator";
import { toast } from "sonner";

interface WeatherDataState {

  current: {
    time: Date;
    temperature2m: number;
    weatherCode: number;
    windSpeed10m: number;
    precipitation: number
    isDay: number;
  };
  hourly: {
    time: Date[];
    temperature2m: Float32Array;
    weatherCode: Float32Array;
  };
  daily: {
    time: Date[];
    weatherCode: Float32Array;
    temperature2mMax: Float32Array;
    sunset: Float32Array;
    sunrise: Float32Array;
    daylightDuration: Float32Array;
    precipitationProbabilityMax: Float32Array;
  };

}

const weatherCodeMappings: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light intensity",
  53: "Drizzle: Moderate intensity",
  55: "Drizzle: Dense intensity",
  56: "Freezing Drizzle: Light intensity",
  57: "Freezing Drizzle: Dense intensity",
  61: "Rain: Slight intensity",
  63: "Rain: Moderate intensity",
  65: "Rain: Heavy intensity",
  66: "Freezing Rain: Light intensity",
  67: "Freezing Rain: Heavy intensity",
  71: "Snow fall: Slight intensity",
  73: "Snow fall: Moderate intensity",
  75: "Snow fall: Heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight intensity",
  81: "Rain showers: Moderate intensity",
  82: "Rain showers: Violent intensity",
  85: "Snow showers: Slight intensity",
  86: "Snow showers: Heavy intensity",
  95: "Thunderstorm: Slight",
  96: "Thunderstorm with hail: Slight",
  99: "Thunderstorm with hail: Heavy",
};


const WeatherData = ({ longitude, latitude, cityName }: { longitude: any, latitude: any, cityName: string }) => {
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherDataState>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const toastid = toast.loading('Loading weather data')
      try {
        const response: WeatherDataState = await fetchWeatherData(longitude, latitude)

        if (response) {
          console.log(JSON.stringify(response, null, 2));

          setWeatherData(response);
          toast.success(
            'Success', {
            id: toastid
          }
          )
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching weather weatherData:", error);
        toast.error('Error fetching weather data', {
          id: toastid
        })
        setLoading(false)
      }
    };

    fetchData();
  }, [longitude, latitude]);

  return (

    loading ? (
      <div>Loading</div>
    ) : <main className="grid grid-cols-1 sm:flex bg-white w-full gap-5  lg:p-4 flex-wrap">
      {/* Left */}
      <section className="grid grid-cols-1 gap-5 flex-1">
        {/* Current forecast */}




        <aside className="p-4">
          <CardHeader className="flex items-center  p-0 flex-row justify-between space-y-0 ">
            <CardTitle className="inline-block font-normal text-slate-500 text-2xl  ">

              {cityName}
            </CardTitle>
            <p className="text-muted-foreground">Time: {formatTime(weatherData?.current.time)}</p>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="mt-12 flex justify-between items-center">
            <h1 className="text-6xl font-bold">{weatherData?.current.temperature2m !== undefined ? Math.round(weatherData?.current.temperature2m) : ''}°C</h1>
            <Image alt="star" src={`/icons/${weatherData?.current.weatherCode}.png`} width={200} height={200} className="lg:mr-10" />
          </CardContent>
        </aside>

        {/* Hourly Forecast */}
        <Card className="p-4 xl:bg-slate-50">
          <CardTitle className="text-muted-foreground text-lg mb-10">Hourly Forecast</CardTitle>
          <CardContent className="grid grid-cols-2 lg:flex gap-4  lg:gap-5 divide-x-2 mt-3  px-0 flex-wrap">

            {weatherData?.hourly?.time.map((time, index) => (
              <div key={index} className="rounded-md shadow-md bg-white/50 backdrop-blur-md border  flex-1 py-4 flex items-center justify-center flex-col  ">
                <h3 className="font-bold text-xs text-muted-foreground ">{formatTime(time)}</h3>

                <Image alt={weatherData?.hourly?.weatherCode[index] !== undefined
                  ? weatherCodeMappings[weatherData.hourly.weatherCode[index]]
                  : ''} src={`/icons/${weatherData.hourly.weatherCode[index]}.png`} width={50} height={50} className="my-5 object-cover object-center" />

                <p className=" text-xs text-muted-foreground font-light ">  {weatherData?.hourly?.weatherCode[index] !== undefined
                  ? weatherCodeMappings[weatherData.hourly.weatherCode[index]]
                  : ''}</p>

                <h2 className="font-semibold text-2xl mt-1">{Math.round(weatherData.hourly.temperature2m[index])}°C</h2>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Air Conditions */}
        <Card className="p-4 bg-slate-100">

          <CardTitle className="text-muted-foreground text-lg mb-2">Air Conditions</CardTitle>
          <CardContent className="flex gap-8 divide-x-2 mt-5 ">



          </CardContent>
        </Card>
      </section>


      {/* right */}
      <Card className="max-w-xs w-96"></Card>
    </main>

  )
}

export default WeatherData