import { GetYearByIdQueryHandler } from "./get-year-by-id/get-year-by-id.handler";
import { GetYearsQueryHandler } from "./get-years/get-years.handler";

export const YearQueryHandlers = [
  GetYearsQueryHandler,
  GetYearByIdQueryHandler
]