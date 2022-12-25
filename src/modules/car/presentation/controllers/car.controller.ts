import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateCarCommand } from "../../application/commands/create-car/create-car.command"
import { DeleteCarByIdCommand } from "../../application/commands/delete-car-by-id/delete-car-by-id.command"
import { UpdateCarByIdCommand } from "../../application/commands/update-car-by-id/update-car-by-id.command"
import { CarIdDTO } from "../../application/dto/car-id.dto"
import { CreateCarDto } from "../../application/dto/create-car.dto"
import { UpdateCarDto } from "../../application/dto/update-car.dto"
import { GetCarByIdQuery } from "../../application/queries/get-car-by-id/get-car-by-id.query"
import { GetCarsQuery } from "../../application/queries/get-cars/get-cars.query"


@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @Message('Car created successfully.')
  async createCar(@Body() createCarDTO: CreateCarDto) {
    return this.commandBus.execute(new CreateCarCommand(createCarDTO))
  }

  @Get()
  @Message('Car fetched successfully.')
  async getCars() {
    return this.queryBus.execute(new GetCarsQuery())
  }

  @Get(':carId')
  @Message('Car fetched successfully.')
  async getCarById(@Param() params: CarIdDTO) {
    return this.queryBus.execute(new GetCarByIdQuery(params.carId))
  }

  @Put(':carId')
  @Message('Car updated successfully.')
  async updateCarById(
    @Param() params: CarIdDTO,
    @Body() updateCarDTO: UpdateCarDto
  ) {
    return this.commandBus.execute(
      new UpdateCarByIdCommand(params.carId, updateCarDTO)
    )
  }

  @Delete(':carId')
  @Message('Car deleted successfully.')
  async deletCarById(@Param() params: CarIdDTO) {
    return this.commandBus.execute(new DeleteCarByIdCommand(params.carId))
  }
}