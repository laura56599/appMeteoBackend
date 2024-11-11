import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite, FavDocument } from './entities/favorite.entity';
import { Model } from 'mongoose';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(@InjectModel(Favorite.name) private readonly favModel: Model<FavDocument>) {}

  async create(addFavoriteDto: AddFavoriteDto): Promise<Favorite> {
  const lastFavorite = await this.favModel.findOne().sort({ id_fav: -1 }).exec();
  const idFav = lastFavorite ? lastFavorite.id_fav + 1 : 1;

  // Crear el nuevo documento con las propiedades necesarias
  const favorites = new this.favModel({ ...addFavoriteDto, id_fav: idFav });
  return favorites.save();
}

  async findAll(): Promise<Favorite[]> {
    return this.favModel.find().exec();
  }

  async findAllByUser(userId: string): Promise<Favorite[]> {
    return this.favModel.find({ userId }).exec();
  }

  async findOne(id: number): Promise<Favorite> {
    return this.favModel.findOne({ id_fav: id }).exec();
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto): Promise<Favorite> {
    return this.favModel.findOneAndUpdate({ id_fav: id }, updateFavoriteDto, { new: true }).exec();
  }

  async remove(id: number): Promise<Favorite> {
    return this.favModel.findOneAndDelete({ id_fav: id }).exec();
  }
}