"use client"
import { fetchWeather } from '@/lib/api/api';
import { WeatherData } from '@/lib/type/weather';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer} from 'recharts';

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); 
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error("Error fetching location:", error);
            alert("Failed to get your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      if (latitude && longitude) {
        const data = await fetchWeather({ lat: latitude, lon: longitude });
        setWeatherData(data);
      }
    };

    if (latitude && longitude) {
      getWeather();
    }
  }, [latitude, longitude]);

  if (!weatherData) return <p>Loading...</p>;

  const dailyData = weatherData?.timelines?.daily;
  const selectedDayData = dailyData[selectedDayIndex]; 
  const hourlyData = weatherData?.timelines.hourly.slice(0,8);
  const chartData = hourlyData?.map((data) => ({
    time: new Date(data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12: true}),
    temperature: data.values.temperature || 0,
    precipitation: data.values.precipitationProbability || 0,
    humidity: data.values.humidity || 0,
    windSpeed: data.values.windSpeed || 0,
  }));

  return (
    <div className='flex flex-col justify-center w-[500px]'>
      <div>{weatherData?.location?.name}</div>

      <div className="p-2  flex justify-between items-center gap-2">
        <div className="flex flex-row gap-4">
          <div>{Math.round(selectedDayData?.values?.temperatureAvg as number)}°C</div>
          <div className="flex flex-col">
            <div className="text-sm">Precipitation: {selectedDayData?.values?.precipitationProbabilityMax}%</div>
            <div className="text-sm">Humidity: {selectedDayData?.values?.humidityAvg}%</div>
            <div className="text-sm">Wind: {selectedDayData?.values?.windSpeedAvg} km/h</div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl">Weather</span>
          <div className="flex flex-col">
            <span className="text-lg">
              {new Date(selectedDayData?.time).toLocaleDateString('en-US', { weekday: 'long' })}
            </span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <XAxis dataKey="time" interval={0} fontSize={10}/>
          <Tooltip />
          <Area  dataKey="temperature" stroke="#8884d8"  name="Temperature (°C)"  dot={{
                fill: "white",
              }}/>
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex  gap-2 mt-4 w-20">
        {dailyData?.map((day, index: number) => (
          <>
          <div className='flex flex-col items-center w-[100px]'>
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              index === selectedDayIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedDayIndex(index)} 
            >
            { new Date(day.time).toLocaleDateString('en-US', { weekday: 'short' })}
          </button>
          <div className='flex w-full justify-around'>
          <div className='text-xs'>{Math.round(day?.values?.temperatureApparentMax as  number)}°</div>
          <div className='text-xs'>{Math.round(day?.values?.temperatureApparentMin as number)}°</div>
          </div>
            </div>
            </>
        ))}
      </div>
    </div>
  );
};

export default Weather;
