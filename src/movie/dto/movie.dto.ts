import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @ApiProperty({
    description: 'Название фильма',
    example: 'Ночная ночь',
    type: Number,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Год релиза',
    example: 2000,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Ид актёров',
    example: [
      'fb3c88f5-8ae3-48b9-9add-914ec758b0d2',
      '297c4afd-7c5e-4a3f-9a8b-6a9963a64411',
    ],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @ApiPropertyOptional({
    description: 'Ссылка на постер фильма',
    example: 'https://storage.example.com/posters/1',
    type: String,
  })
  @IsString()
  imageUrl: string;
}

export class MovieResponse {
  @ApiProperty({
    example: 'Ночная ночь',
  })
  title: 'Пример';
}
