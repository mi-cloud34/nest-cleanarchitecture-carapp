import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { CarModule } from "./modules/car/car.module";
import { ColorModule } from "./modules/color/color.module";
import { config } from "./modules/common/infrastructure/configurations/index.config";
import { KmModule } from "./modules/km/km.module";
import { ModelModule } from "./modules/model/model.module";
import { UserModule } from "./modules/user/user.model";
import { YearModule } from "./modules/year/year.module";

@Module({
  imports: [
    ColorModule,
    CarModule,
    UserModule,
    KmModule,
    ModelModule,
    YearModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'), // Loaded from .ENV
      })
    })
  ],
})
export class AppModule {}

/*@Module({
  imports: [
    ColorModule,
    CarModule,
    MongooseModule.forRoot('mongodb://localhost:27017',
    {dbName: 'nestcacardb'},
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true}
    ),
  ]
})
export class AppModule {}*/