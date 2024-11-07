import { Controller, Post, Body, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body:{username: string; password: string}) {
    return this.authService.login(body.username, body.password);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async update(@Request() req, @Body() body: { email?: string; password?: string }) {
    return this.authService.update(req.user.sub, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async delete(@Request() req) {
    return this.authService.remove(req.user.sub);
  }
}
