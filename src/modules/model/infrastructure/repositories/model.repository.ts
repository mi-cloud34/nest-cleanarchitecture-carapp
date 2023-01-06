import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/modules/common/infrastructure/repositories/base.repository";
import { ModelDocument } from "../../domain/model/model.model.";
import { AbstractModelRepository } from "../../domain/repositories/model.repository";

@Injectable()
export class ModelRepository
  extends BaseRepository<ModelDocument>
  implements AbstractModelRepository<ModelDocument>
{
  constructor(
    @InjectModel(Model.name) private modelModel: Model<ModelDocument>
  ) {
    super(modelModel)
  }
}