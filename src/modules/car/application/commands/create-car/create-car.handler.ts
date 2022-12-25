import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CarDocument } from "src/modules/car/domain/models/car.model"
import { AbstractCarRepository } from "src/modules/car/domain/repositories/car.repository"
import { CreateCarCommand } from "./create-car.command"


@CommandHandler(CreateCarCommand)
export class CreateCarCommandHandler
  implements ICommandHandler<CreateCarCommand>
{
  constructor(
    private readonly carRepository: AbstractCarRepository<CarDocument>
  ) {}

  async execute({ car }: CreateCarCommand) {
    const createdCar = await this.carRepository.create(car)
    return { car: createdCar }
  }
}