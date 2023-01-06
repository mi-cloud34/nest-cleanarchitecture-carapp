import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/modules/user/domain/model/user.model";
export type ModelDocument = Model & Document;
@Schema()
export class Model {
    @Prop({require:true})
    model:string;
    @Prop()
    description:string
    @Prop()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId:User
}
export const ModelSchema = SchemaFactory.createForClass(Model);