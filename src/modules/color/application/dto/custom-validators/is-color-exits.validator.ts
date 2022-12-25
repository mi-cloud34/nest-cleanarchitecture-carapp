import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractColorRepository } from 'src/modules/color/domain/repositories/color.repository'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsColorExist {
  constructor(private readonly repository: AbstractColorRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'color cannot found'
  }
}