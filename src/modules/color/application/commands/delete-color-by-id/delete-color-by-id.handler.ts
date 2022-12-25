import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ColorDocument } from "src/modules/color/domain/model/color.model";
import { AbstractColorRepository } from "src/modules/color/domain/repositories/color.repository";
import { DeleteColorByIdCommand } from "./delete-color-by-id.command";

@CommandHandler(DeleteColorByIdCommand)
export class DeleteColorByIdCommandHandler
  implements ICommandHandler<DeleteColorByIdCommand>
{
  constructor(
    private readonly colorRepository: AbstractColorRepository<ColorDocument>
  ) {}

  async execute({ colorId }: DeleteColorByIdCommand) {
    await this.colorRepository.findByIdAndDelete(colorId)
  }
}