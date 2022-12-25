import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { ColorCommandHandlers } from "./application/commands";
import { IsColorExist } from "./application/dto/custom-validators/is-color-exits.validator";
import { ColorQueryHandlers } from "./application/queries";
import { Color, ColorSchema } from "./domain/model/color.model";
import { AbstractColorRepository } from "./domain/repositories/color.repository";
import { ColorRepository } from "./infrastructure/repositories/color.repository";
import { ColorController } from "./presentation/controllers/color.controller";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Color.name, schema: ColorSchema }])
  ],
  controllers: [ColorController],
  providers: [
    { provide: AbstractColorRepository, useClass: ColorRepository },
    IsColorExist,
    ...ColorCommandHandlers,
    ...ColorQueryHandlers
  ]
})
export class ColorModule {}