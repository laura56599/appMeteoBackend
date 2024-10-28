import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service'; // Importa el servicio de clima
import { Response } from 'express';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}
    @Get()
  async fetchWeather(@Query('location') location: string, @Res() res: Response) {
    // Verifica si la ubicación se envió
    if (!location) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Se requiere una ubicación' });
    }

    try {
      const weatherData = await this.weatherService.getWeatherData(location); // Llama al servicio para obtener los datos del clima
      return res.status(HttpStatus.OK).json({ success: true, data: weatherData });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener datos del clima',
      });
    }
  }
}
