export interface WeatherValues {
    temperatureAvg?: number;
    temperatureApparentMax?: number,
    temperatureApparentMin?: number,
    precipitationProbabilityMax?: number;
    humidityAvg?: number;
    windSpeedAvg?: number;
    temperature?: number;
    precipitationProbability?: number; 
    humidity?: number;
    windSpeed?: number;
  }
  
  export interface DailyTimeline {
    time: string;
    values: WeatherValues;
  }
  
  export interface HourlyTimeline {
    time: string;
    values: WeatherValues;
  }
  
  export interface WeatherData {
    location: {
      lat: number;
      lon: number;
      name: string;
      type: string;
    };
    timelines: {
      daily: DailyTimeline[];
      hourly: HourlyTimeline[];
    };
  }
  