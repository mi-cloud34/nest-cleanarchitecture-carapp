import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/modules/common/infrastructure/repositories/base.repository";
import { Km, KmDocument } from "../../domain/model/km.model";
import { AbstractKmRepository } from "../../domain/repositories/km.repository";

@Injectable()
export class KmRepository
  extends BaseRepository<KmDocument>
  implements AbstractKmRepository<KmDocument>
{
  constructor(
    @InjectModel(Km.name) private kmModel: Model<KmDocument>
  ) {
    super(kmModel)
  }
}