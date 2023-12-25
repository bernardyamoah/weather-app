'use client'
import CityPicker from "@/components/CityPicker";
import { CardDescription, CardTitle } from "@/components/ui/card";

import { useState } from "react";

import WeatherData from "./WeatherData";


export default function Home() {
  const [longitude, setLogitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [cityName, setCityName] = useState('');
  return (
    <main className="p-2  lg:p-10 flex flex-col  min-h-screen  ">
  
        <CardTitle className=" text-bold text-3xl mb-5 text-center">Weather App</CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-center">Powered by Bernard</CardDescription>
      
      <CityPicker setLatitude={setLatitude} setLongitude={setLogitude} setCityName={setCityName} />
      <WeatherData longitude={longitude} latitude={latitude} cityName={cityName} />




    </main>
  )
}
