
import { Injectable } from '@nestjs/common'
import { AbstractBaseRepository } from 'src/modules/common/domain/repository/base.repository';

@Injectable()
export abstract class AbstractKmRepository<
  Document
> extends AbstractBaseRepository<Document> {}