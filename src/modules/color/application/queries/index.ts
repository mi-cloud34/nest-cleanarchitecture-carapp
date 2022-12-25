import { GetColorByIdQueryHandler } from "./get-Color-by-id/get-Color-by-id.handler";
import { GetColorsQueryHandler } from "./get-Colors/get-Colors.handler";


export const ColorQueryHandlers = [
  GetColorsQueryHandler,
  GetColorByIdQueryHandler
]