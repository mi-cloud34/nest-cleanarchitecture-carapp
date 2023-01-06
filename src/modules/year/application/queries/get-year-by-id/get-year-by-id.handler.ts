import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { YearDocument } from "src/modules/year/domain/model/year.model"
import { AbstractYearRepository } from "src/modules/year/domain/repositories/year.repository"
import { GetYearByIdQuery } from "./get-year-by-id.query"

@QueryHandler(GetYearByIdQuery)
export class GetYearByIdQueryHandler
  implements IQueryHandler<GetYearByIdQuery>
{
  constructor(
    private readonly yearRepository: AbstractYearRepository<YearDocument>
  ) {}

  async execute({ yearId }: GetYearByIdQuery) {
    const year = await this.yearRepository.findById(yearId)
    return { year }
  }
}