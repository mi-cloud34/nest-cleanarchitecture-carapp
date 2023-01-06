import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ModelDocument } from "src/modules/model/domain/model/model.model."
import { AbstractModelRepository } from "src/modules/model/domain/repositories/model.repository"
import { GetModelByIdQuery } from "./get-model-by-id.query"

@QueryHandler(GetModelByIdQuery)
export class GetModelByIdQueryHandler
  implements IQueryHandler<GetModelByIdQuery>
{
  constructor(
    private readonly modelRepository: AbstractModelRepository<ModelDocument>
  ) {}

  async execute({ modelId }: GetModelByIdQuery) {
    const model = await this.modelRepository.findById(modelId)
    return { model }
  }
}