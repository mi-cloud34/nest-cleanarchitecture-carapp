import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, Validate } from 'class-validator'
import { IsColorExist } from './custom-validators/is-color-exits.validator'

export class ColorIdDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  @Validate(IsColorExist)
  colorId!: string
}