import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CarDocument } from "src/modules/car/domain/models/car.model"
import { AbstractCarRepository } from "src/modules/car/domain/repositories/car.repository"
import { UpdateCarByIdCommand } from "./update-car-by-id.command"


@CommandHandler(UpdateCarByIdCommand)
export class UpdateCarByIdCommandHandler
  implements ICommandHandler<UpdateCarByIdCommand>
{
  constructor(
    private readonly carRepository: AbstractCarRepository<CarDocument>
  ) {}

  async execute({ carId, car }: UpdateCarByIdCommand) {
    const updatedCar = await this.carRepository.findByIdAndUpdate(
      carId,
      car
    )
    return { car: updatedCar }
  }
}