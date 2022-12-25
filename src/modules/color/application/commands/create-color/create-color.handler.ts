import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ColorDocument } from "src/modules/color/domain/model/color.model"
import { AbstractColorRepository } from "src/modules/color/domain/repositories/color.repository"
import { CreateColorCommand } from "./create-color.command"

@CommandHandler(CreateColorCommand)
export class CreateColorCommandHandler
  implements ICommandHandler<CreateColorCommand>
{
  constructor(
    private readonly colorRepository: AbstractColorRepository<ColorDocument>
  ) {}

  async execute({ color }: CreateColorCommand) {
    const createdColor = await this.colorRepository.create(color)
    return { color: createdColor }
  }
}