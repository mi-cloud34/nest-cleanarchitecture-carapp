import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "src/modules/user/application/commands/create-user/create-user.command";
import { CreateUserDto } from "src/modules/user/application/dto/create-user.dto";
import { RegisterUserDto } from "src/modules/user/application/dto/register-userdto";

@Injectable()
export class AuthService {
  constructor(@Inject(forwardRef(() => CommandBus)) private commandBus: CommandBus) {}
  async register(registerUser: CreateUserDto) {
    console.log("registerU",registerUser);
    
    return this.commandBus.execute(
      new CreateUserCommand(registerUser)
    );
  }
 /*  async login(heroId: string, killDragonDto: KillDragonDto) {
    return this.commandBus.execute(
      new GetUserCommand(heroId, killDragonDto.dragonId)
    );
  } */
}