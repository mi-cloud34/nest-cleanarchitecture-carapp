import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, isBoolean, IsDateString, IsNotEmpty, IsString, IS_EMAIL, MaxLength, MinLength } from "class-validator";
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    readonly name: string;
    @ApiProperty()
    @IsString()
    readonly email: string;
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty({default:"user"})
    @IsString()
    readonly role: string; 
    @ApiProperty({default:Date.now,required: false})
   
    readonly createdAt: Date;
    @ApiProperty({required:false})
    @IsString()
    readonly place: string;
    @ApiProperty({required:false})
    @IsString()
    readonly image: string;
    @ApiProperty({required:false})
    @IsBoolean()
    readonly blocked: boolean;
   
}