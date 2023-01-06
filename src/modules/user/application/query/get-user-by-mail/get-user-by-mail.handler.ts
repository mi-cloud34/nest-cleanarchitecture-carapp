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

  async execute(command: GetUserByEmailQuery) {
   const {email,password}=command;
    const user = await this.userRepository.findOne({email})
    console.log("user2222",user);
    
    return { user }
  }
}