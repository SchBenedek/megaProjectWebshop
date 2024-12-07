import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator"

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    @IsString()
    password: string
}
