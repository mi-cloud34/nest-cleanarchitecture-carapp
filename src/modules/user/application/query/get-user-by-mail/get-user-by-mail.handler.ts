import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { UserDocument } from "src/modules/user/domain/model/user.model"
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository"
import { GetUserByEmailQuery } from "./get-user-by-mail.query"

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    private readonly userRepository: AbstractUserRepository<UserDocument>
  ) {}

  async execute({ email}: GetUserByEmailQuery) {
    const user = await this.userRepository.find(email)
    
    return { user }
  }
}