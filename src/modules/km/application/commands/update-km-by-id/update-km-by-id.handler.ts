import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { KmDocument } from "src/modules/km/domain/model/km.model"
import { AbstractKmRepository } from "src/modules/km/domain/repositories/km.repository"
import { UpdateKmByIdCommand } from "./update-km-by-id.command"

@CommandHandler(UpdateKmByIdCommand)
export class UpdateKmByIdCommandHandler
  implements ICommandHandler<UpdateKmByIdCommand>
{
  constructor(
    private readonly kmRepository: AbstractKmRepository<KmDocument>
  ) {}

  async execute({ kmId, km }: UpdateKmByIdCommand) {
    const updatedKm = await this.kmRepository.findByIdAndUpdate(
      kmId,
      km
    )
    return { km: updatedKm }
  }
}