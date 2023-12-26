import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react";
import { fetchWeatherData } from './fetchWeatherData';
import { formatTime, getDayFromDate } from "@/lib/formatTime";
import { Separator } from "@radix-ui/react-separator";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ModeToggle";

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
    temperature2mMin: Float32Array;
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
      <div>{' '}</div>
    ) : <main className="grid grid-cols-1 sm:flex mt-10 bg-white dark:bg-slate-950 w-full gap-5  lg:p-4 flex-wrap lg:border rounded-md">
      {/* Left */}
      <section className=" grid grid-cols-1 gap-5 flex-1">

        {/* Current forecast */}
        <aside className="p-4">
          <CardHeader className="flex items-center  p-0 flex-row justify-between space-y-0 ">
            <CardTitle className="inline-block font-normal text-muted-foreground text-2xl  ">

              {cityName}
            </CardTitle>
            <Badge className="py-2 text-sm rounded-lg">{formatTime(weatherData?.current.time)}</Badge>
            <ModeToggle />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="mt-12 flex justify-between items-center px-2">
            <h1 className="text-4xl md:text-6xl font-bold">{weatherData?.current.temperature2m !== undefined ? Math.round(weatherData?.current.temperature2m) : ''}°C</h1>
            <div className="w-44 md:w-64 h-44 md:h-64 relative">
              <Image alt={`weatherData?.current.weatherCode`} src={`/icons/${weatherData?.current.weatherCode}.png`} width={200} height={200} className="lg:mr-10  aspect-square object-contain" />
            </div>
          </CardContent>
        </aside>

        {/* Today's forcast Forecast */}
        <Card className="p-4  bg-slate-50 dark:bg-background backdrop-blur-md">
          <CardTitle className="text-muted-foreground text-lg mb-10">Today&apos;s Forecast</CardTitle>
          <CardContent className="grid grid-cols-2  gap-4  lg:gap-5  mt-3  px-0 lg:grid-cols-5">

            {weatherData?.hourly?.time.map((time, index) => (
              <Card key={index} className=" border rounded-xl py-4 flex items-center justify-center flex-col dark:bg-slate-800/20 backdrop-blur-md hover:dark:bg-slate-800/50 duration-500 hover:-translate-y-2">
                <Badge variant='outline' className="font-bold font-mono text-sm  py-1 tracking-wider">{formatTime(time)}</Badge>

                <Image alt={weatherData?.hourly?.weatherCode[index] !== undefined
                  ? weatherCodeMappings[weatherData.hourly.weatherCode[index]]
                  : ''} src={`/icons/${weatherData.hourly.weatherCode[index]}.png`} width={80} height={80} className="my-5 " />

                <p className=" text-xs text-muted-foreground font-light ">  {weatherData?.hourly?.weatherCode[index] !== undefined
                  ? weatherCodeMappings[weatherData.hourly.weatherCode[index]]
                  : ''}</p>

                <h2 className="font-semibold text-2xl mt-1">{Math.round(weatherData.hourly.temperature2m[index])}°C</h2>
              </Card>
            ))}
          </CardContent>
        </Card>


      </section>


      {/* right */}
      <Card className="md:max-w-xs p-4 w-full bg-slate-50 dark:bg-background  overflow-y-scroll">
        <CardTitle className="text-muted-foreground text-lg mb-10">7-Day Forcast</CardTitle>
        <CardContent className="px-0 gap-5 grid divide-y-2 items-center align-middle">
          {weatherData?.daily?.time.map((time, index) => (
            <div key={index} className="  backdrop-blur-md  py-4 grid grid-cols-4 place-content-center place-items-center ">
              <h3 className=" font-light text-xs text-muted-foreground ">{getDayFromDate(time.toDateString())} {time.getDate()}</h3>

              <div className="col-span-2 w-full flex md:flex-col justify-center items-center " >
                <Image alt={weatherData?.daily?.weatherCode[index] !== undefined
                  ? weatherCodeMappings[weatherData.daily.weatherCode[index]]
                  : ''} src={`/icons/${weatherData.daily.weatherCode[index]}.png`} width={60} height={60} className="my-5 object-cover object-center" />

                <p className=" text-center text-base text-muted-foreground font-bold ">  {weatherData?.daily?.weatherCode[index] !== undefined
                  ? weatherCodeMappings[weatherData.daily.weatherCode[index]]
                  : ''}</p>
              </div>

              <div className="space-x-1">
                <span className="font-semibold text-base ">{Math.round(weatherData.daily.temperature2mMax[index])}</span>
                <span>/</span>
                <span className="text-base text-muted-foreground font-light">{Math.round(weatherData.daily.temperature2mMin[index])}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>

  )
}

export default WeatherData