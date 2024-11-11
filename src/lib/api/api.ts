export const fetchWeather = async (location: string | { lat: number; lon: number }) => {
    let locationQuery: string;
    if (typeof location === 'object' && 'lat' in location && 'lon' in location) {
      locationQuery = `${location.lat},${location.lon}`;
    } else {
      locationQuery = location.toString();
    }
  
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${locationQuery}&apikey=1caxcP6yW2b76Kp4IXV5MpJmkNhm18lA`
    );
  
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };
  