import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
@Post('/addfav')
async create(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req) {
  const userId = req.user.userId; // Obtén el userId del token
  const favoriteData = {
    city: createFavoriteDto.city, // Asegúrate de que tienes `city`
    country: createFavoriteDto.country, // Asegúrate de que tienes `country`
    userId: userId,
  };
  return this.favoriteService.create(favoriteData);
}


 @UseGuards(JwtAuthGuard)
  @Get('/user')
  async findUserFavorites(@Request() req: any) {
    const userId = req.user.userId; // Obteniendo el userId desde el token
    return this.favoriteService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
