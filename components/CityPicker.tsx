import React, { useState } from 'react'
import { Country, City } from 'country-state-city'
import Select from 'react-select'
import { useRouter } from 'next/navigation'

import { GlobeIcon } from '@heroicons/react/solid'
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

const CityPicker = () => {
    const [selectedCountry, setSelectedCountry] = useState<option>(null)
    const [selectedCity, setSelectedCity] = useState<cityOption>(null)
    const router = useRouter()

    const handleSelectedCountry = (option: option) => {

        setSelectedCountry(option)
        setSelectedCity(null)
    }
    const handleSelectedCity = (option: cityOption) => {

        setSelectedCity(option)
        router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
    }
    return (
        <div className='space-y-4'>
            <div className='space-y-2'>
                <div className='flex items-center space-x-2 '>
                    <GlobeIcon className='h-5 w-5 ' />
                    <label htmlFor='country'>Country</label>
                </div>
                <Select
                    name='country'
                    value={selectedCountry}
                    options={options}
                    onChange={handleSelectedCountry}
                />
            </div>

            {selectedCountry && (
                <div className='space-y-2'>
                    <div className='flex items-center space-x-2 text-slate-800'>
                        <GlobeIcon className='h-5 w-5 text-white' />
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

        </div>
    )
}

export default CityPicker