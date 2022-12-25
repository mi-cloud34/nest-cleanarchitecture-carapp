import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UserDocument } from "src/modules/user/domain/model/user.model"
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository"
import { CreateUserCommand } from "./create-user.command"


@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userRepository: AbstractUserRepository<UserDocument>
  ) {}

  async execute({ user }: CreateUserCommand) {
    const createdUser = await this.userRepository.create(user)
    return { user: createdUser }
  }
}