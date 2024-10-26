import { Controller, Get, Query, Post, Body, Request, Delete, UseGuards, Param } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { SaveWeatherDto } from './dto/save-weather.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async fetchWeather(@Query('location') location: string) {
    if (!location) {
      return { success: false, message: 'Se requiere una ubicación' };
    }
    try {
      const weatherData = await this.weatherService.getWeatherData(location);
      return { success: true, data: weatherData };
    } catch (error) {
      return { success: false, message: 'Error al obtener datos del clima' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveWeather(@Request() req, @Body() saveWeatherDto: SaveWeatherDto) {
    const userId = req.user.sub;
    return await this.weatherService.saveWeather(userId, saveWeatherDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved')
  async getSavedWeather(@Request() req) {
    const userId = req.user.sub;
    return await this.weatherService.getWeatherByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async removeWeather(@Request() req, @Param('id') weatherId: string) {
    const userId = req.user.sub;
    await this.weatherService.removeWeather(userId, weatherId);
  }
}



