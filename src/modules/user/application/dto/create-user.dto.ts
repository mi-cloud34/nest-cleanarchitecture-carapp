import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean,IsNotEmpty, IsString, IS_EMAIL, MaxLength, MinLength } from "class-validator";
import { IsFile } from "nestjs-form-data";
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
    @ApiProperty({required: false})
    readonly createdAt: Date;
    @ApiProperty({required:false})
    @IsString()
    readonly place: string;
    @ApiProperty({required:false})
    @IsFile()
     image: string;
    @ApiProperty({required:false})
   // @IsBooleanString()
   @Transform(({ value }) => JSON.parse(value))
    @IsBoolean()
    readonly blocked: boolean;
   
}