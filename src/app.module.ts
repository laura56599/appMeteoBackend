import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

dotenv.config();
@Module({
  imports: [
    WeatherModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {

  }
}
