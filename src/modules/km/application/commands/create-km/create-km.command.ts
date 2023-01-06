import { CreateKmDto } from "../../dto/create-km.dto";

export class CreateKmCommand {
  constructor(public readonly km: CreateKmDto) {}
}