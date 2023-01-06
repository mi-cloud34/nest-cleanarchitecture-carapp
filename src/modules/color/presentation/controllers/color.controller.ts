import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { JwtGuard } from "src/modules/auth/guard/jwt-quard"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateColorCommand } from "../../application/commands/create-color/create-color.command"
import { DeleteColorByIdCommand } from "../../application/commands/delete-color-by-id/delete-color-by-id.command"
import { UpdateColorByIdCommand } from "../../application/commands/update-color-by-id/update-color-by-id.command"
import { ColorIdDTO } from "../../application/dto/color-id.dto"
import { CreateColorDto } from "../../application/dto/create-color.dto"
import { UpdateColorDto } from "../../application/dto/update-color.dto"
import { GetColorByIdQuery } from "../../application/queries/get-color-by-id/get-color-by-id.query"
import { GetColorsQuery } from "../../application/queries/get-colors/get-models.query"

@ApiTags('color')
@Controller('color')

export class ColorController {
  constructor(
   private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  @Message('Color created successfully.')
  async createColor(@Req() req,@Body() createColorDTO: CreateColorDto) {
    createColorDTO.userId=req.user.user._id;
    return this.commandBus.execute(new CreateColorCommand(createColorDTO))
  }

  @Get()
  @Message('Color fetched successfully.')
  async getColors(@Query() query:string) {
    console.log("renklerrrr",query);
  
    
    return this.queryBus.execute(new GetColorsQuery())
  }

  @Get(':colorId')
  @Message('Color fetched successfully.')
  async getColorById(@Param() params: ColorIdDTO) {
    console.log("id",params);
    return this.queryBus.execute(new GetColorByIdQuery(params.colorId))
  }
  @UseGuards(JwtGuard)
  @Put(':colorId')
  @Message('Color updated successfully.')
  async updateColorById(
    @Param() params: ColorIdDTO,
    @Body() updateColorDTO: UpdateColorDto
  ) {
    return this.commandBus.execute(
      new UpdateColorByIdCommand(params.colorId, updateColorDTO)
    )
  }
  @UseGuards(JwtGuard)
  @Delete(':colorId')
  @Message('Color deleted successfully.')
  async deletColorById(@Param() params: ColorIdDTO) {
    return this.commandBus.execute(new DeleteColorByIdCommand(params.colorId))
  }
}