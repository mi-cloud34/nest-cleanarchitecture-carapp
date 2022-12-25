import { isBoolean, IsBoolean, IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export  class RegisterUserDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(6)
    readonly name:string;
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(8)
     password: string;
     //@IsString()
    // readonly role: string;
    // @IsDateString()
    // readonly createdAt: Date;
    // @IsString()
    // readonly place: string;
    // @IsString()
    // readonly image: string;
    // @IsBoolean()
    // readonly blocked: boolean;
}