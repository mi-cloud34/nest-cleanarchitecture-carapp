import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Color } from "src/modules/color/domain/model/color.model";
import { Km } from "src/modules/km/domain/model/km.model";
import { Model } from "src/modules/model/domain/model/model.model.";
import { User } from "src/modules/user/domain/model/user.model";
import { Year } from "src/modules/year/domain/model/year.model";
export type CarDocument = Car & Document;

@Schema()
export class Car {
   
    @Prop({require:true})
    carname:string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color' })
    colorId: Color
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Model' })
    modelId: Model
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Km' })
    kmId: Km
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Year' })
    yearId: Year
    @Prop()
    price: number;
    @Prop()
    lt: number;
    @Prop()
    lg: number;
    @Prop({default:"img.jpg"})
    carimage:string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User 
}
export const CarSchema = SchemaFactory.createForClass(Car);