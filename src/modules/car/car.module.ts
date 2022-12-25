import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { CarCommandHandlers } from "./application/commands";
import { IsCarExist } from "./application/dto/custom-validators/is-car-exist.validator";
import { CarQueryHandlers } from "./application/queries";
import { Car, CarSchema } from "./domain/models/car.model";
import { AbstractCarRepository } from "./domain/repositories/car.repository";
import { CarRepository } from "./infrastructure/repositories/car.repository";
import { CarController } from "./presentation/controllers/car.controller";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])
  ],
  controllers: [CarController],
  providers: [
    { provide: AbstractCarRepository, useClass: CarRepository },
    IsCarExist,
    ...CarCommandHandlers,
    ...CarQueryHandlers
  ]
})
export class CarModule {}