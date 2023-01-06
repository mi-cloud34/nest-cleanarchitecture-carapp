import {  HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "src/modules/user/application/commands/create-user/create-user.command";
import { CreateUserDto } from "src/modules/user/application/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from "src/modules/user/application/dto/login-user.dto";
import { User, UserDocument } from "src/modules/user/domain/model/user.model";
import { GetUsersQuery } from "src/modules/user/application/query/get-user/get-user.query";
import { AbstractUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { GetUserByEmailQuery } from "src/modules/user/application/query/get-user-by-mail/get-user-by-mail.query";
@Injectable()
export class AuthService {
  constructor( 
    private commandBus:CommandBus,
    private  queryBus:QueryBus,
   // private readonly userRepository: AbstractUserRepository<UserDocument>,
     private jwtService: JwtService) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  
  async register(registerUser: CreateUserDto) {
    console.log("registerU",registerUser);
    const hashedPassword = await this.hashPassword(registerUser.password);
   registerUser.password=hashedPassword;
    return this.commandBus.execute(
      new CreateUserCommand(registerUser)
    );
  }
  _getUser(user: LoginUserDto):LoginUserDto {
    return user;
 }
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  async validateUser(
  email:string,
  password:string
  ): Promise<LoginUserDto> {
    
   const user=await this.queryBus.execute(
    new GetUserByEmailQuery(email,password)
  );
  console.log("userrrr5555",user);
  console.log("userrrr1",(user.user.password));
  console.log("userrrr2",password);
  
    const doesUserExist = !!user;
    if (!doesUserExist) return null;
    const doesPasswordMatch = await this.doesPasswordMatch(password, user.user.password);
    if (!doesPasswordMatch) return null;

    return this._getUser(user);
  }

  async login(
    existingUser: LoginUserDto,
  ): Promise< {user:LoginUserDto}|{ token: string } > {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    return {user:user, token: jwt };
  }
  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}