import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { JwtGuard } from "src/modules/auth/guard/jwt-quard"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateModelCommand } from "../../application/commands/create-model/create-model.command"
import { DeleteModelByIdCommand } from "../../application/commands/delete-model-by-id/delete-model-by-id.command"
import { UpdateModelByIdCommand } from "../../application/commands/update-model-by-id/update-model-by-id.command"
import { CreateModelDto } from "../../application/dto/create-model.dto"
import { ModelIdDTO } from "../../application/dto/model-id.dto"
import { UpdateModelDto } from "../../application/dto/update-model.dto"
import { GetModelByIdQuery } from "../../application/queries/get-model-by-id/get-model-by-id.query"
import { GetModelsQuery } from "../../application/queries/get-models/get-models.query"

@ApiTags('model')
@Controller('model')

export class ModelController {
  constructor(
   private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  @Message('Model created successfully.')
  async createModel(@Req() req,@Body() createModelDTO: CreateModelDto) {
    createModelDTO.userId=req.user.user._id;
    return this.commandBus.execute(new CreateModelCommand(createModelDTO))
  }

  @Get()
  @Message('Model fetched successfully.')
  async getModels() {
    return this.queryBus.execute(new GetModelsQuery())
  }

  @Get(':modelId')
  @Message('Model fetched successfully.')
  async getModelById(@Param() params: ModelIdDTO) {
    return this.queryBus.execute(new GetModelByIdQuery(params.modelId))
  }
  @UseGuards(JwtGuard)
  @Put(':modelId')
  @Message('Model updated successfully.')
  async updateModelById(
    @Param() params: ModelIdDTO,
    @Body() updateModelDTO: UpdateModelDto
  ) {
    return this.commandBus.execute(
      new UpdateModelByIdCommand(params.modelId, updateModelDTO)
    )
  }
  @UseGuards(JwtGuard)
  @Delete(':modelId')
  @Message('Model deleted successfully.')
  async deleteModelById(@Param() params: ModelIdDTO) {
    return this.commandBus.execute(new DeleteModelByIdCommand(params.modelId))
  }
}