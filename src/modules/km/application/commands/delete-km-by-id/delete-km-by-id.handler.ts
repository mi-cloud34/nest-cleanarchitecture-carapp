import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { KmDocument } from "src/modules/km/domain/model/km.model";
import { AbstractKmRepository } from "src/modules/km/domain/repositories/km.repository";
import { DeleteKmByIdCommand } from "./delete-km-by-id.command";

@CommandHandler(DeleteKmByIdCommand)
export class DeleteKmByIdCommandHandler
  implements ICommandHandler<DeleteKmByIdCommand>
{
  constructor(
    private readonly kmRepository: AbstractKmRepository<KmDocument>
  ) {}

  async execute({ kmId }: DeleteKmByIdCommand) {
    await this.kmRepository.findByIdAndDelete(kmId)
  }
}