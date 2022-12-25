import { CreateColorCommandHandler } from "./create-color/create-color.handler";
import { DeleteColorByIdCommandHandler } from "./delete-color-by-id/delete-color-by-id.handler";
import { UpdateColorByIdCommandHandler } from "./update-color-by-id/update-color-by-id.handler";

export const ColorCommandHandlers = [
  CreateColorCommandHandler,
  UpdateColorByIdCommandHandler,
  DeleteColorByIdCommandHandler
]