import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserDocument } from "src/modules/user/domain/model/user.model"
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository"
import { GetUsersQuery } from "./get-user.query"

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly userRepository: AbstractUserRepository<UserDocument>
  ) {}

  // eslint-disable-next-line
  async execute(query: GetUsersQuery) {
    const users = await this.userRepository.find({})
    return { users }
  }
}