import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/modules/user/domain/model/user.model";

export class CreateColorDto {
    @ApiProperty()
    @IsString()
    @MaxLength(5)
    @IsNotEmpty()
    readonly name:string;
    @ApiProperty()
    @IsString()
    readonly description:string
    @ApiProperty()
    @IsString()
     userId:User
}
