import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service'; // Importa el servicio de clima
import { Response } from 'express';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Get()
  async fetchWeather(
    @Query('location') location: string,
    @Res() res: Response,
  ) {
    // Verifica si la ubicación se envió
    if (!location) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'Se requiere una ubicación' });
    }

    try {
      const weatherData = await this.weatherService.getWeatherData(location); // Llama al servicio para obtener los datos del clima
      return res
        .status(HttpStatus.OK)
        .json({ success: true, data: weatherData });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener datos del clima',
      });
    }
  }

  @Get('/location')
  async fetchWeatherByCoordinates(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Res() res: Response,
  ) {
    // Verificamos que lat y lon no sean nulos o vacíos
    if (!lat || !lon) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message:
          'Se requieren las coordenadas de latitud y longitud para obtener los datos del clima',
      });
    }
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Las coordenadas proporcionadas no son válidas.',
      });
    }

    try {
      // Llamada al servicio para obtener los datos del clima (convertir lat y lon a string)
      const weatherData = await this.weatherService.getWeatherDataByCoordinates(
        latitude.toString(), // Convertimos lat a string
        longitude.toString(), // Convertimos lon a string
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        data: weatherData, // Devolvemos la data recibida de la API externa
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los datos del clima por coordenadas',
      });
    }
  }
  // Endpoint para obtener la fase lunar
  @Get('lunar-phase')
  async fetchLunarPhase(
    @Query('location') location: string,
    @Res() res: Response,
  ) {
    if (!location) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: 'Se requiere una ubicación' });
    }

    try {
      const lunarData = await this.weatherService.getLunarPhase(location);
      return res.status(HttpStatus.OK).json({ success: true, data: lunarData });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'Error al obtener la fase lunar' });
    }
  }
}
