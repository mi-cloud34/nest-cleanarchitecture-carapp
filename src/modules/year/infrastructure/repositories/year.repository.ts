import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/modules/common/infrastructure/repositories/base.repository";
import { Year, YearDocument } from "../../domain/model/year.model";
import { AbstractYearRepository } from "../../domain/repositories/year.repository";

@Injectable()
export class YearRepository
  extends BaseRepository<YearDocument>
  implements AbstractYearRepository<YearDocument>
{
  constructor(
    @InjectModel(Year.name) private yearModel: Model<YearDocument>
  ) {
    super(yearModel)
  }
}