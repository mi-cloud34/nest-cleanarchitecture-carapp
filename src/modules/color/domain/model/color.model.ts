import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/modules/user/domain/model/user.model";
export type ColorDocument = Color & Document;
@Schema()
export class Color {
    @Prop({require:true})
    name:string;
    @Prop()
    description:string
    @Prop()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId:User
}
export const ColorSchema = SchemaFactory.createForClass(Color);