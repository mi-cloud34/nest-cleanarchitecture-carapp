import { CreateUserCommandHandler } from "./create-user/create-user.handler";
import { DeleteUserByIdCommandHandler } from "./delete-user-by-id/delete-user-by-id.handler";
import { UpdateUserByIdCommandHandler } from "./update-user-by-id/update-user-by-id.handler";

export const UserCommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserByIdCommandHandler,
  DeleteUserByIdCommandHandler
]