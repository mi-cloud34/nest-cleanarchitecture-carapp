import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ModelDocument } from "src/modules/model/domain/model/model.model."
import { AbstractModelRepository } from "src/modules/model/domain/repositories/model.repository"
import { UpdateModelByIdCommand } from "./update-model-by-id.command"

@CommandHandler(UpdateModelByIdCommand)
export class UpdateModelByIdCommandHandler
  implements ICommandHandler<UpdateModelByIdCommand>
{
  constructor(
    private readonly modelRepository: AbstractModelRepository<ModelDocument>
  ) {}

  async execute({ modelId, model }: UpdateModelByIdCommand) {
    const updatedModel = await this.modelRepository.findByIdAndUpdate(
      modelId,
      model
    )
    return { model: updatedModel }
  }
}