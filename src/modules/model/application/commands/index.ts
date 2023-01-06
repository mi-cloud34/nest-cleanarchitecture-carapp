import { CreateModelCommandHandler } from "./create-model/create-model.handler";
import { DeleteModelByIdCommandHandler } from "./delete-model-by-id/delete-model-by-id.handler";
import { UpdateModelByIdCommandHandler } from "./update-model-by-id/update-model-by-id.handler";

export const ModelCommandHandlers = [
  CreateModelCommandHandler,
  UpdateModelByIdCommandHandler,
  DeleteModelByIdCommandHandler
]