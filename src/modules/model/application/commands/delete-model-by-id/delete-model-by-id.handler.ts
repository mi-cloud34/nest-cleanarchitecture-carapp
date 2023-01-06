import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ModelDocument } from "src/modules/model/domain/model/model.model.";
import { AbstractModelRepository } from "src/modules/model/domain/repositories/model.repository";
import { DeleteModelByIdCommand } from "./delete-model-by-id.command";

@CommandHandler(DeleteModelByIdCommand)
export class DeleteModelByIdCommandHandler
  implements ICommandHandler<DeleteModelByIdCommand>
{
  constructor(
    private readonly modelRepository: AbstractModelRepository<ModelDocument>
  ) {}

  async execute({ modelId }: DeleteModelByIdCommand) {
    await this.modelRepository.findByIdAndDelete(modelId)
  }
}