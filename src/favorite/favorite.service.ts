import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite, FavDocument } from './entities/favorite.entity';
import { Model } from 'mongoose';

@Injectable()
export class FavoriteService {

  constructor(@InjectModel(Favorite.name) private readonly favModel: Model < FavDocument > ) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise < Favorite > {

    const lastFavorite = await this.favModel.findOne().sort({ id_fav: -1 }).exec();
    const idfav = lastFavorite ? lastFavorite.id_fav + 1 : 1;

    // Crea el nuevo documento con el incremento `id_fav` 
    const favorites = new this.favModel({ ...createFavoriteDto, id_fav: idfav });
    return favorites.save();
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
