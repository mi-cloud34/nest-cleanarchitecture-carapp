import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractKmRepository } from 'src/modules/km/domain/repositories/km.repository'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsKmExist {
  constructor(private readonly repository: AbstractKmRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'color cannot found'
  }
}