import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weather extends Document {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  temperature: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  moonPhase: string;// falta verificar el tipo de dato
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
