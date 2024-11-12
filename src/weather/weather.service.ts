import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeatherData(location: string) {
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  // Si no se recibe una ubicación válida, lanzar un error.
  if (!location || location === 'defaultCity') {
    throw new Error('Ubicación no válida para la solicitud del clima');
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}&lang=es&unitGroup=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del clima desde Visual Crossing API:', error);
    throw new Error('No se pudieron obtener los datos del clima.');
  }
}

async getWeatherDataByCoordinates(lat: number, lon: number) {
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${apiKey}&lang=es&unitGroup=metric`;

  try {
    const response = await axios.get(url);
    return response.data;  // Retorna los datos del clima
  } catch (error) {
    console.error('Error al obtener datos del clima por coordenadas:', error);
    throw new Error('No se pudieron obtener los datos del clima.');
  }
}

  async getLunarPhase(location: string) {
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&lang=es&unitGroup=metric`;
    const response = await axios.get(url);

    // Aquí asumimos que la información de la fase lunar se encuentra en el primer día de la respuesta
    const lunarPhase = response.data.days[0].moonphase;

    return { phase: lunarPhase };
  }
}