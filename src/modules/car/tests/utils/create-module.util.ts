
import { Reflector } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { Test } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { HttpExceptionFilter } from 'src/modules/common/infrastructure/rest/filters/http-exception.filter'
import { ResponseMappingInterceptor } from 'src/modules/common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { ValidationPipe } from 'src/modules/common/infrastructure/rest/pipes/validation.pipe'
import { CarModule } from '../../car.module'

export const createModule = async () => {
  const module = await Test.createTestingModule({
    imports: [
      CarModule,
      MongooseModule.forRootAsync({
        useFactory: async () => ({
          uri: (await MongoMemoryServer.create()).getUri(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        })
      })
    ]
  }).compile()

  const app = module.createNestApplication()

  useContainer(app, { fallbackOnErrors: true })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))

  await app.init()
  return { app, module }
}
