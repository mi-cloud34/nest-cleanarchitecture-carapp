import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ColorDocument } from "src/modules/color/domain/model/color.model"
import { AbstractColorRepository } from "src/modules/color/domain/repositories/color.repository"
import { GetColorByIdQuery } from "./get-color-by-id.query"

@QueryHandler(GetColorByIdQuery)
export class GetColorByIdQueryHandler
  implements IQueryHandler<GetColorByIdQuery>
{
  constructor(
    private readonly colorRepository: AbstractColorRepository<ColorDocument>
  ) {}

  async execute({ colorId }: GetColorByIdQuery) {
    const color = await this.colorRepository.findById(colorId)
    return { color }
  }
}