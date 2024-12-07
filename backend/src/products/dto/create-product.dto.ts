import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    event: string
    @IsNotEmpty()
    @IsString()
    type: string
    @IsNotEmpty()
    @IsNumber()
    price: number
    @IsNotEmpty()
    @IsBoolean()
    availability: boolean
    @IsNotEmpty()
    @IsString()
    seat: string   
}
