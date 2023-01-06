import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { User } from "src/modules/user/domain/model/user.model";

export class CreateModelDto {
    @ApiProperty()
    @IsString()
    @MaxLength(5)
    @IsNotEmpty()
    readonly model:string;
    @ApiProperty()
    @IsString()
    readonly description:string
    @ApiProperty()
    @IsString()
     userId:User
}
