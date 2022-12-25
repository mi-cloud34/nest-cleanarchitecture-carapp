import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UserDocument } from "src/modules/user/domain/model/user.model"
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository"
import { UpdateUserByIdCommand } from "./update-user-by-id.command"


@CommandHandler(UpdateUserByIdCommand)
export class UpdateUserByIdCommandHandler
  implements ICommandHandler<UpdateUserByIdCommand>
{
  constructor(
    private readonly userRepository: AbstractUserRepository<UserDocument>
  ) {}

  async execute({ userId, user }: UpdateUserByIdCommand) {
    const updatedUser = await this.userRepository.findByIdAndUpdate(
      userId,
      user
    )
    return { user: updatedUser }
  }
}