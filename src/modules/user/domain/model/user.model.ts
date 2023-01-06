import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ require: true })
  name: string;
  @Prop({
    require: true,
    unique: true,
     match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide e valid email',
    ], 
  })
  email: string;
  @Prop({ require: true,})
  password: string;
  @Prop({ require: true ,enum: ['user', 'admin'] })
  role: string;
  @Prop({default:Date.now,required:false})
  createdAt: Date;
  @Prop({require:false})
  place: string;
  @Prop()
  image: string;
  @Prop()
  blocked: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
