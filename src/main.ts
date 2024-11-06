import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

console.log(dotenv);
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita el CORS para que acepte las solicitudes de el frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // Permite el envio del token en la solicitud cross-origin
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
