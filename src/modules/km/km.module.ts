import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { KmCommandHandlers } from "./application/commands";
import { IsKmExist } from "./application/dto/custom-validators/is-km-exits.validator";
import { KmQueryHandlers } from "./application/queries";
import { Km, KmSchema } from "./domain/model/km.model";
import { AbstractKmRepository } from "./domain/repositories/km.repository";
import { KmRepository } from "./infrastructure/repositories/km.repository";
import { KmController } from "./presentation/controllers/km.controller";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Km.name, schema: KmSchema }])
  ],
  controllers: [KmController],
  providers: [
    { provide: AbstractKmRepository, useClass: KmRepository },
    IsKmExist,
    ...KmCommandHandlers,
    ...KmQueryHandlers
  ]
})
export class KmModule {}