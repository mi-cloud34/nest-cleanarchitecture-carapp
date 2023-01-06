import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { IsFile } from "nestjs-form-data";
import { Color } from "src/modules/color/domain/model/color.model";
import { Km } from "src/modules/km/domain/model/km.model";
import { Model } from "src/modules/model/domain/model/model.model.";
import { User } from "src/modules/user/domain/model/user.model";
import { Year } from "src/modules/year/domain/model/year.model";



export class CreateCarDto {
   @ApiProperty()
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly carname: string;
    @ApiProperty()
    @IsString()
    readonly colorId: Color
    @ApiProperty()
    @IsString()
   readonly modelId: Model;
   @ApiProperty()
   @IsString()
   readonly kmId: Km 
   @ApiProperty()
   @IsString()
   readonly yearId: Year 
   @ApiProperty()
   @IsNumber()
   readonly price: number;
   @ApiProperty()
   @IsNumber()
   readonly lt: number;
   @ApiProperty()
   @IsNumber()
   readonly lg: number;
   @ApiProperty()
  @IsFile()
    carimage: string;
    @ApiProperty()
    userId: User
}