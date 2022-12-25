import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ColorDocument } from "src/modules/color/domain/model/color.model"
import { AbstractColorRepository } from "src/modules/color/domain/repositories/color.repository"
import { UpdateColorByIdCommand } from "./update-color-by-id.command"

@CommandHandler(UpdateColorByIdCommand)
export class UpdateColorByIdCommandHandler
  implements ICommandHandler<UpdateColorByIdCommand>
{
  constructor(
    private readonly colorRepository: AbstractColorRepository<ColorDocument>
  ) {}

  async execute({ colorId, color }: UpdateColorByIdCommand) {
    const updatedCar = await this.colorRepository.findByIdAndUpdate(
      colorId,
      color
    )
    return { movie: updatedCar }
  }
}