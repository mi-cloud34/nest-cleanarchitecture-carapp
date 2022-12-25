import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/modules/common/infrastructure/repositories/base.repository";
import { Car, CarDocument } from "../../domain/models/car.model";
import { AbstractCarRepository } from "../../domain/repositories/car.repository";

@Injectable()
export class CarRepository
  extends BaseRepository<CarDocument>
  implements AbstractCarRepository<CarDocument>
{
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>
  ) {
    super(carModel)
  }
}