import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Color } from "src/modules/color/domain/model/color.model";



export class CreateCarDto {
   @ApiProperty()
    @IsString()
    @MaxLength(10)
    @IsNotEmpty()
    readonly carname: string;
    @ApiProperty()
    @IsString()
    readonly colorId: Color
 /*   readonly modelId: Model
   readonly kmId: Km */
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
   @IsString()
   readonly carimage: string;
   
 //  readonly userId: User
}