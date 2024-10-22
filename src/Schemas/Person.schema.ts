import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, HydrateOptions } from 'mongoose';

export type UserDocument = HydratedDocument<Person>;


@Schema()
export class Person {
    @Prop()
    person_id: number;
    
}

export const PersonSchema = SchemaFactory.createForClass(Person);