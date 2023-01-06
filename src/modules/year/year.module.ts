import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { YearCommandHandlers } from "./application/commands";
import { IsYearExist } from "./application/dto/custom-validators/is-year-exits.validator";
import { YearQueryHandlers } from "./application/queries";
import { Year, YearSchema } from "./domain/model/year.model";
import { AbstractYearRepository } from "./domain/repositories/year.repository";
import { YearRepository } from "./infrastructure/repositories/year.repository";
import { YearController } from "./presentation/controllers/year.controller";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Year.name, schema: YearSchema }])
  ],
  controllers: [YearController],
  providers: [
    { provide: AbstractYearRepository, useClass: YearRepository },
    IsYearExist,
    ...YearCommandHandlers,
    ...YearQueryHandlers
  ]
})
export class YearModule {}