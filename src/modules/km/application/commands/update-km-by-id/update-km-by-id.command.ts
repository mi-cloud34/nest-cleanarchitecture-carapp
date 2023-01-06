import { UpdateKmDto } from "../../dto/update-km.dto";

export class UpdateKmByIdCommand {
  constructor(
    public readonly kmId: string,
    public readonly km: UpdateKmDto
  ) {}
}