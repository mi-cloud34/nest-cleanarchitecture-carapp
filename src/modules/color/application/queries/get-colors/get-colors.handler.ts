import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ColorDocument } from "src/modules/color/domain/model/color.model"
import { AbstractColorRepository } from "src/modules/color/domain/repositories/color.repository"
import { GetColorsQuery } from "./get-colors.query"

@QueryHandler(GetColorsQuery)
export class GetColorsQueryHandler implements IQueryHandler<GetColorsQuery> {
  constructor(
    private readonly colorRepository: AbstractColorRepository<ColorDocument>
  ) {}

  // eslint-disable-next-line
  async execute(query: GetColorsQuery) {
    const colors = await this.colorRepository.find({})
    return { colors }
  }
}