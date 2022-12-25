import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractUserRepository } from 'src/modules/user/domain/repositories/user.repository'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserExist {
  constructor(private readonly repository: AbstractUserRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: string, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'user cannot found'
  }
}