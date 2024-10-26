import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
  @Prop({ required: true })
  latitude: number; // Latitud

  @Prop({ required: true })
  longitude: number; // Longitud

  @Prop({ required: true })
  address: string; // Dirección

  @Prop({ required: true })
  timezone: string; // Zona horaria

  @Prop({ required: true })
  tzoffset: number; // Desfase horario

  @Prop({ required: true })
  description: string; // Descripción general del clima

  @Prop({ required: true, type: [Object] }) // Definimos 'days' como un array de objetos
  days: Array<{
    datetime: string; // Fecha
    datetimeEpoch: number; // Epoch time de la fecha
    tempmax: number; // Temperatura máxima
    tempmin: number; // Temperatura mínima
    temp: number; // Temperatura actual
    feelslikemax: number; // Sensación térmica máxima
    feelslikemin: number; // Sensación térmica mínima
    feelslike: number; // Sensación térmica actual
    dew: number; // Punto de rocío
    humidity: number; // Humedad
    precip: number; // Precipitación
    precipprob: number; // Probabilidad de precipitación
    precipcover: number; // Cobertura de precipitación
    preciptype: string[]; // Tipos de precipitación
    snow: number; // Nieve
    snowdepth: number; // Profundidad de nieve
    windgust: number; // Ráfagas de viento
    windspeed: number; // Velocidad del viento
    winddir: number; // Dirección del viento
    pressure: number; // Presión atmosférica
    cloudcover: number; // Cobertura de nubes
    visibility: number; // Visibilidad
    solarradiation: number; // Radiación solar
    solarenergy: number; // Energía solar
    uvindex: number; // Índice UV
    severerisk: number; // Riesgo severo
    sunrise: string; // Hora del amanecer
    sunset: string; // Hora del atardecer
    moonphase: number; // Fase lunar
    conditions: string; // Condiciones del clima
    icon: string; // Icono representativo del clima
  }>;

  @Prop({ required: true })
  userId: string; // Para asociar el clima guardado a un usuario
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
