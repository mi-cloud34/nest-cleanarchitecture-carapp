import supertest, { SuperTest } from 'supertest'
import { createModule } from './utils/create-module.util'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AbstractCarRepository } from '../domain/repositories/car.repository'
import { CarDocument } from '../domain/models/car.model'

describe('Car Controller - [POST] /car', () => {
  let nestApp: INestApplication
  let carRepository: AbstractCarRepository<CarDocument>
  let request: SuperTest<any>

  beforeAll(async () => {
    const { app, module } = await createModule()
    nestApp = app
    carRepository = module.get<AbstractCarRepository<CarDocument>>(
      AbstractCarRepository
    )
    request = supertest(app.getHttpServer())
  })

  it('should create a new car', async () => {
    const car = {
      carname: 'BMW',
      colorId: '63b35ace98c8ed2a26b10281',
      modelId: '63b35ace98c8ed2a26b10282',
      kmId: '63b35ace98c8ed2a26b10283',
      yearId: '63b35ace98c8ed2a26b10284',
      price: 350,
      lt: 45.76,
      lg: 34.56,
      userId: '63b35ace98c8ed2a26b10286',
      
    }

    const createdCarResponse = await request
      .post('/car')
      .send(car)
      .expect(HttpStatus.CREATED)

    const createdCar = createdCarResponse.body.payload.car

    expect(createdCar).toEqual({
      _id: createdCar._id,
      carname: car.carname,
      colorId: car.colorId,
      modelId: car.modelId,
      kmId:car.kmId,
      yearId:car.yearId,
      price:car.price,
      lt:car.lt,
      lg:car.lg,
      userId:car.userId,
      createdAt: createdCar.createdAt
    })
  })

  afterEach(async () => {
    await carRepository.deleteMany({})
  })

  afterAll(async () => {
    await nestApp.close()
  })
})
