import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { CarIdDTO } from "src/modules/car/application/dto/car-id.dto"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateUserCommand } from "../../application/commands/create-user/create-user.command"
import { DeleteUserByIdCommand } from "../../application/commands/delete-user-by-id/delete-user-by-id.command"
import { UpdateUserByIdCommand } from "../../application/commands/update-user-by-id/update-user-by-id.command"
import { CreateUserDto } from "../../application/dto/create-user.dto"
import { UpdateUserDto } from "../../application/dto/update-user.dto"
import { UserIdDTO } from "../../application/dto/user-id.dto"
import { GetUserByIdQuery } from "../../application/query/get-user-by-id/get-user-by-id.query"
import { GetUsersQuery } from "../../application/query/get-user/get-user.query"


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @Message('User created successfully.')
  async createUser(@Body() createUserDTO: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDTO))
  }

  @Get()
  @Message('User fetched successfully.')
  async getUsers() {
    return this.queryBus.execute(new GetUsersQuery())
  }

  @Get(':userId')
  @Message('User fetched successfully.')
  async getUserById(@Param() params: UserIdDTO) {
    return this.queryBus.execute(new GetUserByIdQuery(params.userId))
  }

  @Put(':userId')
  @Message('User updated successfully.')
  async updateUserById(
    @Param() params: UserIdDTO,
    @Body() updateUserDTO: UpdateUserDto
  ) {
    return this.commandBus.execute(
      new UpdateUserByIdCommand(params.userId, updateUserDTO)
    )
  }

  @Delete(':userId')
  @Message('User deleted successfully.')
  async deletUserById(@Param() params: UserIdDTO) {
    return this.commandBus.execute(new DeleteUserByIdCommand(params.userId))
  }
}