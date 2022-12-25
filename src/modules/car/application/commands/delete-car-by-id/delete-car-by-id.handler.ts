import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CarDocument } from "src/modules/car/domain/models/car.model";
import { AbstractCarRepository } from "src/modules/car/domain/repositories/car.repository";
import { DeleteCarByIdCommand } from "./delete-car-by-id.command";


@CommandHandler(DeleteCarByIdCommand)
export class DeleteCarByIdCommandHandler
  implements ICommandHandler<DeleteCarByIdCommand>
{
  constructor(
    private readonly movieRepository: AbstractCarRepository<CarDocument>
  ) {}

  async execute({ carId }: DeleteCarByIdCommand) {
    await this.movieRepository.findByIdAndDelete(carId)
  }
}