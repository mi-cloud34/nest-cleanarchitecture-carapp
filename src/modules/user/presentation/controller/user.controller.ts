import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { CarIdDTO } from "src/modules/car/application/dto/car-id.dto"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { MediaService } from "src/modules/common/infrastructure/helper/s3.service"
import { CreateUserCommand } from "../../application/commands/create-user/create-user.command"
import { DeleteUserByIdCommand } from "../../application/commands/delete-user-by-id/delete-user-by-id.command"
import { UpdateUserByIdCommand } from "../../application/commands/update-user-by-id/update-user-by-id.command"
import { CreateUserDto } from "../../application/dto/create-user.dto"
import { UpdateUserDto } from "../../application/dto/update-user.dto"
import { UserIdDTO } from "../../application/dto/user-id.dto"
import { GetUserByIdQuery } from "../../application/query/get-user-by-id/get-user-by-id.query"
import { GetUsersQuery } from "../../application/query/get-user/get-user.query"
import {v4} from  'uuid'
import { FileInterceptor } from "@nestjs/platform-express"
import { FormDataRequest } from "nestjs-form-data"

@ApiTags('user')
@Controller('user')
//@UseInterceptors(FileInterceptor (''))
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mediaService:MediaService,
  ) {}

  @Post()
  @Message('User created successfully.')
  @FormDataRequest()
  //@UseInterceptors(FileInterceptor ('image'))
  async createUser(@Req() req ,/* @UploadedFile() file: Express.Multer.File,*/
  @Body() createUserDTO: CreateUserDto) {
    const file=req.files.image;
    console.log("fileeee",file);
    const key="users/photo/"+`${v4()}${file.filename}`;
    const keys=`${v4()}${file.filename}`;
    this.mediaService.uploadS3(file,key)
    createUserDTO.image=keys;
    return this.commandBus.execute(new CreateUserCommand(createUserDTO))
  }

  @Get()
  @Message('User fetched successfully.')
  async getUsers() {
    return this.queryBus.execute(new GetUsersQuery())
  }

  @Get(':userId')
  @Message('User fetched successfully.')
  async getUserById(@Param() params: UserIdDTO,@Query('key') key:string) {
    const user=this.queryBus.execute(new GetUserByIdQuery(params.userId));
    user['image']=this.mediaService.getLinkMedia(key)
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
    const user=this.queryBus.execute(new GetUserByIdQuery(params.userId))
    const post1='users/photo/'+user['image']
    this.mediaService.deleteFileS3(post1);
    return this.commandBus.execute(new DeleteUserByIdCommand(params.userId))
  }
}