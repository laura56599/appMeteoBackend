import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather, WeatherDocument } from './entities/weather.entity';
import { SaveWeatherDto } from './dto/save-weather.dto';

@Injectable()
export class WeatherService {
  constructor(@InjectModel(Weather.name) private readonly weatherModel: Model<WeatherDocument>) {}

  async getWeatherData(location: string) {
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&lang=es&unitGroup=metric`;
    
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener datos del clima de la API externa');
    }
  }

  async saveWeather(userId: string, saveWeatherDto: SaveWeatherDto): Promise<Weather> {
    const newWeather = new this.weatherModel({
      latitude: saveWeatherDto.data.latitude,
      longitude: saveWeatherDto.data.longitude,
      address: saveWeatherDto.data.address,
      timezone: saveWeatherDto.data.timezone,
      tzoffset: saveWeatherDto.data.tzoffset,
      description: saveWeatherDto.data.description,
      days: saveWeatherDto.data.days,
      userId, // Asocia el clima al usuario
    });

    return await newWeather.save();
  }

  async getWeatherByUser(userId: string): Promise<Weather[]> {
    return await this.weatherModel.find({ userId }).exec();
  }

  async getWeatherById(weatherId: string): Promise<Weather> {
    const weatherData = await this.weatherModel.findById(weatherId).exec();
    if (!weatherData) {
      throw new NotFoundException('Datos del clima no encontrados');
    }
    return weatherData;
  }

  async removeWeather(userId: string, weatherId: string): Promise<void> {
    const result = await this.weatherModel.findOneAndDelete({ _id: weatherId, userId });
    if (!result) {
      throw new NotFoundException('No se encontró ningún dato del clima para eliminar');
    }
  }
}
