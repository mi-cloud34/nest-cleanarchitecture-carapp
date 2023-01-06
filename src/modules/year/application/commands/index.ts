
import { DeleteYearByIdCommandHandler } from "src/modules/Year/application/commands/delete-Year-by-id/delete-Year-by-id.handler";
import { UpdateYearByIdCommandHandler } from "src/modules/Year/application/commands/update-Year-by-id/update-Year-by-id.handler";
import { CreateYearCommandHandler } from "./create-year/create-year.handler";

export const YearCommandHandlers = [
  CreateYearCommandHandler,
  UpdateYearByIdCommandHandler,
  DeleteYearByIdCommandHandler
]