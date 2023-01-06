import { UpdateYearDto } from "../../dto/update-year.dto";

export class UpdateYearByIdCommand {
  constructor(
    public readonly yearId: string,
    public readonly year: UpdateYearDto
  ) {}
}