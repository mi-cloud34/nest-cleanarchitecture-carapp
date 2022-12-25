import { GetUserByIdQueryHandler } from "./get-user-by-id/get-user-by-id.handler";
import { GetUsersQueryHandler } from "./get-user/get-user.handler";

export const UserQueryHandlers = [
    GetUsersQueryHandler,
    GetUserByIdQueryHandler
  ]