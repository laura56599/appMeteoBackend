import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, HydrateOptions } from 'mongoose';

export type UserDocument = HydratedDocument<Favorites>;


@Schema()
export class Favorites {
    @Prop()
    favorite_id: number;
    
}