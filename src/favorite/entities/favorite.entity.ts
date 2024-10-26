import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavDocument = Favorite & Document;

@Schema()
export class Favorite extends Document{

    id_fav: number;

    @Prop({required: true})
    country: string;

    @Prop({required: true})
    city: string;

}

export const FavoriteSchema= SchemaFactory.createForClass(Favorite);
