import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { YearDocument } from "src/modules/year/domain/model/year.model"
import { AbstractYearRepository } from "src/modules/year/domain/repositories/year.repository"
import { UpdateYearByIdCommand } from "./update-year-by-id.command"

@CommandHandler(UpdateYearByIdCommand)
export class UpdateYearByIdCommandHandler
  implements ICommandHandler<UpdateYearByIdCommand>
{
  constructor(
    private readonly yearRepository: AbstractYearRepository<YearDocument>
  ) {}

  async execute({ yearId, year }: UpdateYearByIdCommand) {
    const updateYear = await this.yearRepository.findByIdAndUpdate(
      yearId,
      year
    )
    return { year: updateYear }
  }
}