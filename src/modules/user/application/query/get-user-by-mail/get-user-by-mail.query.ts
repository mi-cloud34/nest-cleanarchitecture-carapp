import { LoginUserDto } from "../../dto/login-user.dto";

export class GetUserByEmailQuery {
    constructor(
        public readonly email: string,public  password: string,
       //public query:LoginUserDto
        ) {}
  }