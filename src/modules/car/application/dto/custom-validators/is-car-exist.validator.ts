import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractCarRepository } from 'src/modules/car/domain/repositories/car.repository'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCarExist {
  constructor(private readonly repository: AbstractCarRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'car cannot found'
  }
}