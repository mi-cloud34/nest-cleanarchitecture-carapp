import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { KmDocument } from "src/modules/km/domain/model/km.model"
import { AbstractKmRepository } from "src/modules/km/domain/repositories/km.repository"
import { GetKmByIdQuery } from "./get-km-by-id.query"

@QueryHandler(GetKmByIdQuery)
export class GetKmByIdQueryHandler
  implements IQueryHandler<GetKmByIdQuery>
{
  constructor(
    private readonly kmRepository: AbstractKmRepository<KmDocument>
  ) {}

  async execute({ kmId }: GetKmByIdQuery) {
    const km = await this.kmRepository.findById(kmId)
    return { km }
  }
}