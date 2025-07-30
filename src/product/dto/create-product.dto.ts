import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  height: number;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  price: number;
}
