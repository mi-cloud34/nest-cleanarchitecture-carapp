import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/user/application/dto/create-user.dto";
import { User } from "src/modules/user/domain/model/user.model";
import { AuthService } from "../../application/service/auht-services";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateUserDto): Promise<User> {
   // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    try {
      console.log(user);
      return this.authService.register(user);
    } catch (error) {
      throw error;
    }
   
  }
}