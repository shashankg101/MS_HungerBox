import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, Max } from 'class-validator';

export class MenuDto {
    id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    outlet_name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    item_name: string;

    @IsNotEmpty()
    @IsString()
    calories: string; // Keep it as string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(200)
    price: number;
}
