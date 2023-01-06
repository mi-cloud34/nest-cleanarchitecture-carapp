import { GetKmByIdQueryHandler } from "./get-km-by-id/get-km-by-id.handler";
import { GetKmsQueryHandler } from "./get-kms/get-kms.handler";

export const KmQueryHandlers = [
  GetKmsQueryHandler,
  GetKmByIdQueryHandler
]