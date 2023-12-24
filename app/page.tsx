'use client'
import CityPicker from "@/components/CityPicker";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

import WeatherData from "./WeatherData";


export default function Home() {
  const [longitude, setLogitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [cityName, setCityName] = useState('');
  return (
    <main className="p-2  lg:p-10 flex flex-col  min-h-screen  ">
      <Card className="w-96 mx-auto  bg-white p-4">
        <CardTitle className=" text-bold text-3xl mb-5 text-center">Weather App</CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-center">Powered by Bernard</CardDescription>
        <Separator className="my-10" />
        <CardContent>
          <CityPicker setLatitude={setLatitude} setLongitude={setLogitude} setCityName={setCityName} />
        </CardContent>
      </Card>

      <WeatherData longitude={longitude} latitude={latitude} cityName={cityName} />




    </main>
  )
}
