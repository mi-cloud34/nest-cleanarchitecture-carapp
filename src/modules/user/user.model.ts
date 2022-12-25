import { Module,forwardRef } from "@nestjs/common";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
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

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    //forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    { provide: AbstractUserRepository, useClass: UserRepository },
    IsUserExist,
    ...UserCommandHandlers,
    ...UserQueryHandlers
  ],
  //exports: [CommadBus],
})
export class UserModule {}