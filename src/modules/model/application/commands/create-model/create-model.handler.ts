import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ModelDocument } from "src/modules/model/domain/model/model.model."
import { AbstractModelRepository } from "src/modules/model/domain/repositories/model.repository"
import { CreateModelCommand } from "./create-model.command"

@CommandHandler(CreateModelCommand)
export class CreateModelCommandHandler
  implements ICommandHandler<CreateModelCommand>
{
  constructor(
    private readonly modelRepository: AbstractModelRepository<ModelDocument>
  ) {}

  async execute({ model }: CreateModelCommand) {
    const createdModel = await this.modelRepository.create(model)
    return { model: createdModel }
  }
}