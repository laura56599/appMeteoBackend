import { IsNotEmpty, IsObject } from 'class-validator';

export class SaveWeatherDto {
  @IsNotEmpty()
  @IsObject()
  data: {
    latitude: number;
    longitude: number;
    address: string;
    timezone: string;
    tzoffset: number;
    description: string;
    days: Array<{
      datetime: string;
      datetimeEpoch: number;
      tempmax: number;
      tempmin: number;
      temp: number;
      feelslikemax: number;
      feelslikemin: number;
      feelslike: number;
      dew: number;
      humidity: number;
      precip: number;
      precipprob: number;
      precipcover: number;
      preciptype: string[];
      snow: number;
      snowdepth: number;
      windgust: number;
      windspeed: number;
      winddir: number;
      pressure: number;
      cloudcover: number;
      visibility: number;
      solarradiation: number;
      solarenergy: number;
      uvindex: number;
      severerisk: number;
      sunrise: string;
      sunriseEpoch: number;
      sunset: string;
      sunsetEpoch: number;
      moonphase: number;
      conditions: string;
      icon: string;
    }>;
  };
}
