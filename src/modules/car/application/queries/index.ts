import { GetCarByIdQueryHandler } from "./get-car-by-id/get-car-by-id.handler";
import { GetCarsQueryHandler } from "./get-cars/get-cars.handler";


export const CarQueryHandlers = [
  GetCarsQueryHandler,
  GetCarByIdQueryHandler
]