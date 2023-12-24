'use client'
import CityPicker from "@/components/CityPicker";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#394f68] to-[#183b7e] p-10 flex flex-col justify-center items-center   ">
      <Card className="w-96 mx-auto  bg-white p-4">
        <CardTitle className=" text-bold text-3xl mb-5 text-center">Weather App</CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-center">Powered by Bernard</CardDescription>

        <Separator className="my-10" />

        <CardContent className="py-3 ">
          <CityPicker />
        </CardContent>
      </Card>
    </main>
  )
}
