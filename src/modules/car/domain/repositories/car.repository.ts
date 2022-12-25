
import { Injectable } from '@nestjs/common'
import { AbstractBaseRepository } from 'src/modules/common/domain/repository/base.repository';

@Injectable()
export abstract class AbstractCarRepository<
  Document
> extends AbstractBaseRepository<Document> {}