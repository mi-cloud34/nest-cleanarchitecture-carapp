import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { JwtGuard } from "src/modules/auth/guard/jwt-quard"
import { Message } from "src/modules/common/infrastructure/decorators/message.decorators"
import { CreateCarCommand } from "../../application/commands/create-car/create-car.command"
import { DeleteCarByIdCommand } from "../../application/commands/delete-car-by-id/delete-car-by-id.command"
import { UpdateCarByIdCommand } from "../../application/commands/update-car-by-id/update-car-by-id.command"
import { CarIdDTO } from "../../application/dto/car-id.dto"
import { CreateCarDto } from "../../application/dto/create-car.dto"
import { UpdateCarDto } from "../../application/dto/update-car.dto"
import { GetCarByIdQuery } from "../../application/queries/get-car-by-id/get-car-by-id.query"
import { GetCarsQuery } from "../../application/queries/get-cars/get-cars.query"
import {v4} from  'uuid'
import { MediaService } from "src/modules/common/infrastructure/helper/s3.service"

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mediaService:MediaService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @Message('Car created successfully.')
  async createCar(@Req() req,@Body() createCarDTO: CreateCarDto) {
    createCarDTO.userId=req.user.user._id;
    console.log("userIddddd",req.user.user._id);
    const file=req.files.carimage;
    const key="cars/photo/"+`${v4()}${file.name}`;
    const keys=`${v4()}${file.name}`;
    this.mediaService.uploadS3(file,key)
    createCarDTO.carimage=keys;
    return this.commandBus.execute(new CreateCarCommand(createCarDTO))
  }

  @Get()
  @Message('Car fetched successfully.')
  async getCars(@Query() query:string) {
    console.log("queryyy",query);
    
    return this.queryBus.execute(new GetCarsQuery(query))
  }

  @Get(':carId')
  @Message('Car fetched successfully.')
  async getCarById(@Param() params: CarIdDTO,@Query('key') key:string) {
     const car=this.queryBus.execute(new GetCarByIdQuery(params.carId));
    // const key='/cars/photo/';
   // const data=car['carimage'];
    car['carimage']=this.mediaService.getLinkMedia(key)
    return this.queryBus.execute(new GetCarByIdQuery(params.carId))
  }
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
  @Delete(':carId')
  @Message('Car deleted successfully.')
  async deletCarById(@Param() params: CarIdDTO) {
    const car=this.queryBus.execute(new GetCarByIdQuery(params.carId))
    const post1='cars/photo/'+car['carimage']
    this.mediaService.deleteFileS3(post1);
    return this.commandBus.execute(new DeleteCarByIdCommand(params.carId))
  }
}