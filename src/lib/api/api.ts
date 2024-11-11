export const fetchWeather = async (location: string) => {
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=1caxcP6yW2b76Kp4IXV5MpJmkNhm18lA`
    );
  
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };
  