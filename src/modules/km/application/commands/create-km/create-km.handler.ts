import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { KmDocument } from "src/modules/km/domain/model/km.model"
import { AbstractKmRepository } from "src/modules/km/domain/repositories/km.repository"
import { CreateKmCommand } from "./create-km.command"

@CommandHandler(CreateKmCommand)
export class CreateKmCommandHandler
  implements ICommandHandler<CreateKmCommand>
{
  constructor(
    private readonly kmRepository: AbstractKmRepository<KmDocument>
  ) {}

  async execute({ km }: CreateKmCommand) {
    const createdKm = await this.kmRepository.create(km)
    return { km: createdKm }
  }
}