import { IsString, MaxLength } from 'class-validator';

export class QueryParameterDto {
  @IsString()
  @MaxLength(20)
  param: string;
}
