import { UpdateUserDto } from "../../dto/update-user.dto";


export class UpdateUserByIdCommand {
  constructor(
    public readonly userId: string,
    public readonly user: UpdateUserDto
  ) {}
}