/*import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'
 import { useContainer } from 'class-validator'
import { ValidationPipe } from './modules/common/infrastructure/rest/pipes/validation.pipe'
import { HttpExceptionFilter } from './modules/common/infrastructure/rest/filters/http-exception.filter'
import { ResponseMappingInterceptor } from './modules/common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { INestApplication } from '@nestjs/common'
function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Nest.js example')
    .setDescription('This is example for nest.js')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.setGlobalPrefix('globalPrefix')
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))
  setupSwagger(app);
  await app.listen(5000)
}
bootstrap()*/

/*
///////////////////////////
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { useContainer } from 'class-validator'

import helmet from 'helmet'

import { HttpExceptionFilter } from './modules/common/infrastructure/rest/filters/http-exception.filter'
import { ResponseMappingInterceptor } from './modules/common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { ValidationPipe } from './modules/common/infrastructure/rest/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const configService = app.get<ConfigService>(ConfigService)

  const globalPrefix = configService.get('GLOBAL_PREFIX')

  app.setGlobalPrefix(globalPrefix)

  app.use(helmet())
  //app.use(compression())
  //app.use(morgan('tiny'))

  app.useGlobalPipes(new ValidationPipe())
 // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))

  const appName = configService.get('APP_NAME')
  const appDescription = configService.get('APP_DESCRIPTION')
  const apiVersion = configService.get('API_VERSION')

  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion(apiVersion)
    .build()

  const document = SwaggerModule.createDocument(app, config)

  //SwaggerModule.setup( app, document)
  SwaggerModule.setup(globalPrefix, app, document)

  const port = configService.get('PORT')
  await app.listen(port)
}
bootstrap()
*/
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { useContainer } from 'class-validator'

import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { ResponseMappingInterceptor } from './modules/common/infrastructure/rest/interceptors/response-mapping.interceptor'
import { HttpExceptionFilter } from './modules/common/infrastructure/rest/filters/http-exception.filter'
import { ValidationPipe } from './modules/common/infrastructure/rest/pipes/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  const configService = app.get<ConfigService>(ConfigService)
  const globalPrefix = configService.get('GLOBAL_PREFIX')
  app.setGlobalPrefix(globalPrefix)
 app.useGlobalPipes(new ValidationPipe())
  //app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseMappingInterceptor(new Reflector()))
  const appName = configService.get('APP_NAME')
  const appDescription = configService.get('APP_DESCRIPTION')
  const apiVersion = configService.get('API_VERSION')
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion(apiVersion)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  //SwaggerModule.setup('/', app, document)
  SwaggerModule.setup(globalPrefix, app, document)

  const port = configService.get('PORT')
  await app.listen(port)
}
bootstrap()