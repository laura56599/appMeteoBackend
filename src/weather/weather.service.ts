import { Injectable } from '@nestjs/common';
import axios from 'axios';
//import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  async getWeatherData(location: string) {
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;
    //const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`; //trae los datos en ingles y en grados fahrenheit
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&lang=es&unitGroup=metric`; //trae los datos en español y en grados celsius
    const response = await axios.get(url);
    const weatherData = response.data;

    return weatherData;
  }
}