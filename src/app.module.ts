import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherModule } from './weather/weather.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';

dotenv.config();
@Module({
  imports: [
    WeatherModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    FavoriteModule,
  ],
  controllers: [AppController, WeatherController],
  providers: [AppService, AuthModule],
})
export class AppModule {
  constructor() {

  }
}
