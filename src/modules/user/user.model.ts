import { Module,forwardRef } from "@nestjs/common";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "../auth/application/service/auht-services";
import { AuthModule } from "../auth/auth.module";
import { UserCommandHandlers } from "./application/commands";
import { CreateUserCommand } from "./application/commands/create-user/create-user.command";
import { CreateUserCommandHandler } from "./application/commands/create-user/create-user.handler";
import { IsUserExist } from "./application/dto/custom-validators/is-user-exits-validator";
import { UserQueryHandlers } from "./application/query";
import { User, UserSchema } from "./domain/model/user.model";
import { AbstractUserRepository } from "./domain/repositories/user.repository";
import { UserRepository } from "./infrastructure/repositories/user.repository";
import { UserController } from "./presentation/controller/user.controller";
import * as bcrypt from 'bcrypt';
@Module({
  imports: [
    CqrsModule,
    AuthModule,
    //forwardRef(() => AuthModule),
    MongooseModule.forFeatureAsync([
      { name: 'User',
  useFactory: () => {
    const schema = UserSchema;

    schema.pre('findOneAndUpdate', async function () {
      const user = this.cast(this.model, this.getUpdate());
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        this.setUpdate(user);
      }
    });

    return schema;
  },

}
  ]
  )
],
  controllers: [UserController],
  providers: [
    { provide: AbstractUserRepository, useClass: UserRepository },
    IsUserExist,
    ...UserCommandHandlers, 
    ...UserQueryHandlers
  ],
  // exports: [
  //   //CqrsModule , ...UserCommandHandlers, ...UserQueryHandlers
  //   UserRepository
  // ],
})
export class UserModule {}