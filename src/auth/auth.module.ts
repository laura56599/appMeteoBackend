import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtSt } from 'src/Jwt/jwtService';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'Llave_s3cr3t4_2024',
      signOptions: { expiresIn: '700s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtSt, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
