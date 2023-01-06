import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/modules/user/domain/model/user.model";
export type YearDocument = Year & Document;
@Schema()
export class Year {
    @Prop({require:true})
    year:string;
    @Prop()
    description:string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId:User
}
export const YearSchema = SchemaFactory.createForClass(Year);