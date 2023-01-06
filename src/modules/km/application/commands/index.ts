import { CreateKmCommandHandler } from "./create-km/create-km.handler";
import { DeleteKmByIdCommandHandler } from "./delete-km-by-id/delete-km-by-id.handler";
import { UpdateKmByIdCommandHandler } from "./update-km-by-id/update-km-by-id.handler";

export const KmCommandHandlers = [
  CreateKmCommandHandler,
  UpdateKmByIdCommandHandler,
  DeleteKmByIdCommandHandler
]