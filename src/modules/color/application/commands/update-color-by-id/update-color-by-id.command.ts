import { UpdateColorDto } from "../../dto/update-color.dto";

export class UpdateColorByIdCommand {
  constructor(
    public readonly colorId: string,
    public readonly color: UpdateColorDto
  ) {}
}