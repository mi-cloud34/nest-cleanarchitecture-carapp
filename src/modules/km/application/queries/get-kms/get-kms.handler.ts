import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { KmDocument } from "src/modules/km/domain/model/km.model"
import { AbstractKmRepository } from "src/modules/km/domain/repositories/km.repository"
import { GetKmsQuery } from "./get-kms.query"

@QueryHandler(GetKmsQuery)
export class GetKmsQueryHandler implements IQueryHandler<GetKmsQuery> {
  constructor(
    private readonly kmRepository: AbstractKmRepository<KmDocument>
  ) {}

  // eslint-disable-next-line
  async execute(query: GetKmsQuery) {
    const kms = await this.kmRepository.find({})
    return { kms }
  }
}