import React, { useState } from 'react'
import { Country, City } from 'country-state-city'
import Select from 'react-select'
import { useRouter } from 'next/navigation'

import { GlobeIcon } from '@heroicons/react/solid'
import { Card, CardContent } from './ui/card'
type option = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    };
    label: string;
} | null

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        cityCode: string;

    };
    label: string;
} | null




const options = Country.getAllCountries().map(country => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name
}))
type CityPickerProps = {
    setLongitude: (longitude: any) => void;
    setLatitude: (latitude: any) => void;
    setCityName: (option: any) => void;

};
const CityPicker = ({ setLongitude, setLatitude, setCityName }: CityPickerProps) => {
    const [selectedCountry, setSelectedCountry] = useState<option>(null)
    const [selectedCity, setSelectedCity] = useState<cityOption>(null)


    const handleSelectedCountry = (option: option) => {

        setSelectedCountry(option)

        setSelectedCity(null)
    }
    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option)
        setCityName(option?.value.name || '')
        setLongitude(option?.value.longitude || '0');
        setLatitude(option?.value.latitude || '0');
        // router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }
    return (
        <Card className='w-full mx-auto mt-6 max-w-3xl p-4'>
            <CardContent className='grid grid-cols-2 items-center gap-5'>
                <div className='w-full '>
                    <div className='flex items-center space-x-2 w-full '>
                        <GlobeIcon className='h-5 w-5 ' />
                        <label htmlFor='country'>Country</label>
                    </div>
                    <Select
                        className='w-full'
                        name='country'
                        value={selectedCountry}
                        options={options}
                        onChange={handleSelectedCountry}
                    />
                </div>

                {selectedCountry && (
                    <div className='w-full'>
                        <div className='flex items-center space-x-2 text-slate-800'>
                            <GlobeIcon className='h-5 w-5' />
                            <label htmlFor='city'>City</label>
                        </div>
                        <Select
                            name='city'
                            value={selectedCity}
                            options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(
                                (city) => ({
                                    value: {
                                        latitude: city.latitude!,
                                        longitude: city.longitude!,
                                        countryCode: city.countryCode,
                                        name: city.name,
                                        cityCode: city.stateCode
                                    },
                                    label: city.name
                                })
                            )}
                            onChange={handleSelectedCity}

                        />
                    </div>
                )}
            </CardContent>

        </Card>
    )
}

export default CityPicker