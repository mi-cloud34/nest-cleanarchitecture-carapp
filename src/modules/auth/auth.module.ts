import { forwardRef, Module } from "@nestjs/common";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { UserCommandHandlers } from "../user/application/commands";
import { UserModule } from "../user/user.model";
import { AuthService } from "./application/service/auht-services";
import { JwtGuard } from "./guard/jwt-quard";
import { JwtStrategy } from "./guard/jwt-strategy";
import { LocalStrategy } from "./guard/local-strategy";
import { AuthController } from "./presentation/controller/auth.controller";


@Module({
  imports: [
       // CommandBus,  
       //  forwardRef(() => UserModule),
       CqrsModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard,LocalStrategy, JwtStrategy],
  //exports: [AuthService, JwtGuard,LocalStrategy, JwtStrategy],
  
})

export class AuthModule {}