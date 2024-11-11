import Weather from '@/components/Weather'
import React from 'react'

const WeatherPage = () => {
  return (
    <div className='mt-10 text-2xl flex justify-center items-center'>
    <Weather location='rawalpindi'/>
    </div>

  )
}

export default WeatherPage