import { GetColorByIdQueryHandler } from "./get-color-by-id/get-color-by-id.handler";
import { GetColorsQueryHandler } from "./get-colors/get-models.handler";

export const ColorQueryHandlers = [
  GetColorsQueryHandler,
  GetColorByIdQueryHandler
]