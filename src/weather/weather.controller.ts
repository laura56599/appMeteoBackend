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
    if (!location) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Se requiere una ubicación para obtener el clima.',
      });
    }
  
    try {
      const weatherData = await this.weatherService.getWeatherData(location);
      return res.status(HttpStatus.OK).json({
        success: true,
        data: weatherData,
      });
    } catch (error) {
      console.error('Error al obtener los datos del clima:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error al obtener los datos del clima.',
      });
    }
  }

  @Get('/location')
  async fetchWeatherByCoordinates(@Query('location') location: string, @Res() res: Response) {
    if (location && location.includes(',')) {
      const [lat, lon] = location.split(',').map(Number);
  
      if (isNaN(lat) || isNaN(lon)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Las coordenadas proporcionadas no son válidas.',
        });
      }
  
      try {
        const weatherData = await this.weatherService.getWeatherDataByCoordinates(lat, lon);
        return res.status(HttpStatus.OK).json({
          success: true,
          data: weatherData,
        });
      } catch (error) {
        console.error('Error al obtener los datos del clima por coordenadas:', error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Error al obtener los datos del clima.',
        });
      }
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Ubicación no válida o faltante.',
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
