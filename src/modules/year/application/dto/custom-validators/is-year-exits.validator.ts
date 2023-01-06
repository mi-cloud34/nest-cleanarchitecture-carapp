import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractYearRepository } from 'src/modules/year/domain/repositories/year.repository'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsYearExist {
  constructor(private readonly repository: AbstractYearRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'year cannot found'
  }
}