import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { CarDocument } from "src/modules/car/domain/models/car.model"
import { AbstractCarRepository } from "src/modules/car/domain/repositories/car.repository"
import { GetCarByIdQuery } from "./get-car-by-id.query"

@QueryHandler(GetCarByIdQuery)
export class GetCarByIdQueryHandler
  implements IQueryHandler<GetCarByIdQuery>
{
  constructor(
    private readonly carRepository: AbstractCarRepository<CarDocument>
  ) {}

  async execute({ carId }: GetCarByIdQuery) {
    const car = await this.carRepository.findById(carId).populate({path:'colorId',select:'name description userId'})
    return { car }
  }
}