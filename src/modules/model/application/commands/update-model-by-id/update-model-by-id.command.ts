import { UpdateModelDto } from "../../dto/update-model.dto";

export class UpdateModelByIdCommand {
  constructor(
    public readonly modelId: string,
    public readonly model: UpdateModelDto
  ) {}
}