import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { CarDocument } from "src/modules/car/domain/models/car.model"
import { AbstractCarRepository } from "src/modules/car/domain/repositories/car.repository"
import { GetCarsQuery } from "./get-cars.query"


@QueryHandler(GetCarsQuery)
export class GetCarsQueryHandler implements IQueryHandler<GetCarsQuery> {
  constructor(
    private readonly carRepository: AbstractCarRepository<CarDocument>
  ) {}

  // eslint-disable-next-line
  async execute({query}: GetCarsQuery) {
    const cars = await this.carRepository.find(query).populate({path:'colorId',select:'name description userId'})
    return { cars }
  }
}