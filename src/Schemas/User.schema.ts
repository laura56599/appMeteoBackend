import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, HydrateOptions } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {
    @Prop()
    user_id: number;
    
}