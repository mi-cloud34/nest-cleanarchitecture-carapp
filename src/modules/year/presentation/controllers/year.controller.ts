import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { JwtGuard } from "src/modules/auth/guard/jwt-quard"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateYearCommand } from "../../application/commands/create-year/create-year.command"
import { DeleteYearByIdCommand } from "../../application/commands/delete-year-by-id/delete-year-by-id.command"
import { UpdateYearByIdCommand } from "../../application/commands/update-year-by-id/update-year-by-id.command"
import { CreateYearDto } from "../../application/dto/create-year.dto"
import { UpdateYearDto } from "../../application/dto/update-year.dto"
import { YearIdDTO } from "../../application/dto/year-id.dto"
import { GetYearByIdQuery } from "../../application/queries/get-year-by-id/get-year-by-id.query"
import { GetYearsQuery } from "../../application/queries/get-years/get-years.query"
 
@ApiTags('year')
@Controller('year')

export class YearController {
  constructor(
   private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  @Message('Year created successfully.')
  async createYear(@Req() req,@Body() createYearDTO: CreateYearDto) {
    createYearDTO.userId=req.user.user._id;
   
    return this.commandBus.execute(new CreateYearCommand(createYearDTO))
  }

  @Get()
  @Message('Year fetched successfully.')
  async getYears() {
    return this.queryBus.execute(new GetYearsQuery())
  }

  @Get(':yearId')
  @Message('Year fetched successfully.')
  async getYearById(@Param() params: YearIdDTO) {
    return this.queryBus.execute(new GetYearByIdQuery(params.yearId))
  }
  @UseGuards(JwtGuard)
  @Put(':yearId')
  @Message('Year updated successfully.')
  async updateColorById(
    @Param() params: YearIdDTO,
    @Body() updateYearDTO: UpdateYearDto
  ) {
    return this.commandBus.execute(
      new UpdateYearByIdCommand(params.yearId, updateYearDTO)
    )
  }
  @UseGuards(JwtGuard)
  @Delete(':yearId')
  @Message('Year deleted successfully.')
  async deletYearById(@Param() params: YearIdDTO) {
    return this.commandBus.execute(new DeleteYearByIdCommand(params.yearId))
  }
}