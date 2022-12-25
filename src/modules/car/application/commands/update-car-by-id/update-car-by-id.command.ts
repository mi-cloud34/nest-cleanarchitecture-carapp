import { UpdateCarDto } from "../../dto/update-car.dto";


export class UpdateCarByIdCommand {
  constructor(
    public readonly carId: string,
    public readonly car: UpdateCarDto
  ) {}
}