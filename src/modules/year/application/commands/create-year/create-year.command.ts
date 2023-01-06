import { CreateYearDto } from "../../dto/create-year.dto";

export class CreateYearCommand {
  constructor(public readonly year: CreateYearDto) {}
}