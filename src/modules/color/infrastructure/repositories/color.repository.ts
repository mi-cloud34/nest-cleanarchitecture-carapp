import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/modules/common/infrastructure/repositories/base.repository";
import { Color, ColorDocument } from "../../domain/model/color.model";
import { AbstractColorRepository } from "../../domain/repositories/color.repository";

@Injectable()
export class ColorRepository
  extends BaseRepository<ColorDocument>
  implements AbstractColorRepository<ColorDocument>
{
  constructor(
    @InjectModel(Color.name) private colorModel: Model<ColorDocument>
  ) {
    super(colorModel)
  }
}