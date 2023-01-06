import { CreateModelDto } from "../../dto/create-model.dto";

export class CreateModelCommand {
  constructor(public readonly model: CreateModelDto) {}
}