import { GetModelByIdQueryHandler } from "./get-model-by-id/get-model-by-id.handler";
import { GetModelsQueryHandler } from "./get-models/get-models.handler";

export const ModelQueryHandlers = [
  GetModelsQueryHandler,
  GetModelByIdQueryHandler
]