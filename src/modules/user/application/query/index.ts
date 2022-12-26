import { GetUserByIdQueryHandler } from "./get-user-by-id/get-user-by-id.handler";
import { GetUserByEmailQueryHandler } from "./get-user-by-mail/get-user-by-mail.handler";
import { GetUsersQueryHandler } from "./get-user/get-user.handler";

export const UserQueryHandlers = [
    GetUsersQueryHandler,
    GetUserByIdQueryHandler,
    GetUserByEmailQueryHandler
  ]