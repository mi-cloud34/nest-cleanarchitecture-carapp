import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { YearDocument } from "src/modules/year/domain/model/year.model";
import { AbstractYearRepository } from "src/modules/year/domain/repositories/year.repository";
import { DeleteYearByIdCommand } from "./delete-year-by-id.command";

@CommandHandler(DeleteYearByIdCommand)
export class DeleteYearByIdCommandHandler
  implements ICommandHandler<DeleteYearByIdCommand>
{
  constructor(
    private readonly yearRepository: AbstractYearRepository<YearDocument>
  ) {}

  async execute({ yearId }: DeleteYearByIdCommand) {
    await this.yearRepository.findByIdAndDelete(yearId)
  }
}