import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserDocument } from "src/modules/user/domain/model/user.model"
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository"
import { GetUserByIdQuery } from "./get-user-by-id.query"

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    private readonly userRepository: AbstractUserRepository<UserDocument>
  ) {}

  async execute({ userId }: GetUserByIdQuery) {
    const user = await this.userRepository.findById(userId)
    return { user }
  }
}