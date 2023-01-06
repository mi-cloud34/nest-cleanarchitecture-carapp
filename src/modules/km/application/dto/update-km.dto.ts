import { PartialType } from '@nestjs/mapped-types';
import { CreateKmDto } from './create-km.dto';

export class UpdateKmDto extends PartialType(CreateKmDto) {}
