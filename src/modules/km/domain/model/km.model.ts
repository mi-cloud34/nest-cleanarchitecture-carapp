import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/modules/user/domain/model/user.model";
export type KmDocument = Km & Document;
@Schema()
export class Km {
    @Prop({require:true})
    km:string;
    @Prop()
    description:string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId:User
}
export const KmSchema = SchemaFactory.createForClass(Km);