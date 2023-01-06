import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { YearDocument } from "src/modules/year/domain/model/year.model"
import { AbstractYearRepository } from "src/modules/year/domain/repositories/year.repository"
import { CreateYearCommand } from "./create-year.command"

@CommandHandler(CreateYearCommand)
export class CreateYearCommandHandler
  implements ICommandHandler<CreateYearCommand>
{
  constructor(
    private readonly yearRepository: AbstractYearRepository<YearDocument>
  ) {}

  async execute({ year }: CreateYearCommand) {
    const createdYear= await this.yearRepository.create(year)
    return { year: createdYear }
  }
}