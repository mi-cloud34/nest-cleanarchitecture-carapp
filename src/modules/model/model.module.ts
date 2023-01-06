import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelCommandHandlers } from "./application/commands";
import { IsModelExist } from "./application/dto/custom-validators/is-model-exits.validator";
import { ModelQueryHandlers } from "./application/queries";
import { Model, ModelSchema } from "./domain/model/model.model.";
import { AbstractModelRepository } from "./domain/repositories/model.repository";
import { ModelRepository } from "./infrastructure/repositories/model.repository";
import { ModelController } from "./presentation/controllers/model.controller";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Model.name, schema: ModelSchema }])
  ],
  controllers: [ModelController],
  providers: [
    { provide: AbstractModelRepository, useClass: ModelRepository },
    IsModelExist,
    ...ModelCommandHandlers,
    ...ModelQueryHandlers
  ]
})
export class ModelModule {}