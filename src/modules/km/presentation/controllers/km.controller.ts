import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { JwtGuard } from "src/modules/auth/guard/jwt-quard"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateKmCommand } from "../../application/commands/create-km/create-km.command"
import { DeleteKmByIdCommand } from "../../application/commands/delete-km-by-id/delete-km-by-id.command"
import { UpdateKmByIdCommand } from "../../application/commands/update-km-by-id/update-km-by-id.command"
import { KmIdDTO } from "../../application/dto/color-id.dto"
import { CreateKmDto } from "../../application/dto/create-km.dto"
import { UpdateKmDto } from "../../application/dto/update-km.dto"
import { GetKmByIdQuery } from "../../application/queries/get-km-by-id/get-km-by-id.query"
import { GetKmsQuery } from "../../application/queries/get-kms/get-kms.query"

@ApiTags('km')
@Controller('km')

export class KmController {
  constructor(
   private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  @Message('Km created successfully.')
  async createKm(@Req() req,@Body() createKmDTO: CreateKmDto) {
    createKmDTO.userId=req.user.user._id;
    return this.commandBus.execute(new CreateKmCommand(createKmDTO))
  }

  @Get()
  @Message('Km fetched successfully.')
  async getKms() {
    return this.queryBus.execute(new GetKmsQuery())
  }

  @Get(':kmId')
  @Message('Km fetched successfully.')
  async getKmById(@Param() params: KmIdDTO) {
    return this.queryBus.execute(new GetKmByIdQuery(params.kmId))
  }
  @UseGuards(JwtGuard)
  @Put(':kmId')
  @Message('Km updated successfully.')
  async updateColorById(
    @Param() params: KmIdDTO,
    @Body() updateKmDTO: UpdateKmDto
  ) {
    return this.commandBus.execute(
      new UpdateKmByIdCommand(params.kmId, updateKmDTO)
    )
  }
  @UseGuards(JwtGuard)
  @Delete(':kmId')
  @Message('Km deleted successfully.')
  async deletKmById(@Param() params: KmIdDTO) {
    return this.commandBus.execute(new DeleteKmByIdCommand(params.kmId))
  }
}