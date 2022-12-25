import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type ColorDocument = Color & Document;
@Schema()
export class Color {
    @Prop({require:true})
    name:string;
    @Prop()
    description:string
    @Prop()
    userId:string
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    // userId:User
}
export const ColorSchema = SchemaFactory.createForClass(Color);