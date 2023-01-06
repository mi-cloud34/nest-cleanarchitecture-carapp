import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractModelRepository } from 'src/modules/model/domain/repositories/model.repository'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsModelExist {
  constructor(private readonly repository: AbstractModelRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'model cannot found'
  }
}