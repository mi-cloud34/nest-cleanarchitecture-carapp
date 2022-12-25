import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, Validate } from 'class-validator'
import { IsUserExist } from './custom-validators/is-user-exits-validator'

export class UserIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @Validate(IsUserExist)
  userId!: string
}