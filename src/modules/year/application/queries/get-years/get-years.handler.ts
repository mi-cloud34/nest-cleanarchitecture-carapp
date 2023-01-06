import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { YearDocument } from "src/modules/year/domain/model/year.model"
import { AbstractYearRepository } from "src/modules/year/domain/repositories/year.repository"
import { GetYearsQuery } from "./get-years.query"

@QueryHandler(GetYearsQuery)
export class GetYearsQueryHandler implements IQueryHandler<GetYearsQuery> {
  constructor(
    private readonly yearRepository: AbstractYearRepository<YearDocument>
  ) {}

  // eslint-disable-next-line
  async execute(query: GetYearsQuery) {
    const years = await this.yearRepository.find({})
    return { years }
  }
}