import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ModelDocument } from "src/modules/model/domain/model/model.model."
import { AbstractModelRepository } from "src/modules/model/domain/repositories/model.repository"
import { GetModelsQuery } from "./get-models.query"

@QueryHandler(GetModelsQuery)
export class GetModelsQueryHandler implements IQueryHandler<GetModelsQuery> {
  constructor(
    private readonly modelRepository: AbstractModelRepository<ModelDocument>
  ) {}

  // eslint-disable-next-line
  async execute(query: GetModelsQuery) {
    const models = await this.modelRepository.find({})
    return { models }
  }
}