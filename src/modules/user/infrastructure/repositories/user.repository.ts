import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/modules/common/infrastructure/repositories/base.repository";
import { User, UserDocument } from "../../domain/model/user.model";
import { AbstractUserRepository } from "../../domain/repositories/user.repository";

@Injectable()
export class UserRepository
  extends BaseRepository<UserDocument>
  implements AbstractUserRepository<UserDocument>
{
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
    super(userModel)
  }
}