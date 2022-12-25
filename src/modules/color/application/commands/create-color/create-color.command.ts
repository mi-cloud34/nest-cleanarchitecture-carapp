import { CreateColorDto } from "../../dto/create-color.dto";

export class CreateColorCommand {
  constructor(public readonly color: CreateColorDto) {}
}