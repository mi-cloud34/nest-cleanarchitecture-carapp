import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserDocument } from "src/modules/user/domain/model/user.model";
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { DeleteUserByIdCommand } from "./delete-user-by-id.command";

@CommandHandler(DeleteUserByIdCommand)
export class DeleteUserByIdCommandHandler
  implements ICommandHandler<DeleteUserByIdCommand>
{
  constructor(
    private readonly userRepository: AbstractUserRepository<UserDocument>
  ) {}

  async execute({ userId }: DeleteUserByIdCommand) {
    await this.userRepository.findByIdAndDelete(userId)
  }
}