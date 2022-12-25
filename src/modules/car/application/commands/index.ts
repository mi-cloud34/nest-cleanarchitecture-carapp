import { CreateCarCommandHandler } from "./create-car/create-car.handler";
import { DeleteCarByIdCommandHandler } from "./delete-car-by-id/delete-car-by-id.handler";
import { UpdateCarByIdCommandHandler } from "./update-car-by-id/update-car-by-id.handler";

export const CarCommandHandlers = [
  CreateCarCommandHandler,
  UpdateCarByIdCommandHandler,
  DeleteCarByIdCommandHandler
]