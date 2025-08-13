import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export enum TaskTag {
  WORK = 'work',
  TEST = 'test',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  title: string;

  @IsString({ message: 'Должна быть строкой' })
  @IsOptional()
  description: string;

  @IsInt({ message: 'Приоритет должен быть числом' })
  @IsPositive({ message: 'Приоритет должен быть положительным' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Теги должны быть массивом' })
  @IsEnum(TaskTag, { each: true, message: 'Недопустимое значение тега' })
  @IsOptional()
  tags: TaskTag[];

  @IsString({ message: 'пароль должен быть строкой' })
  @Matches(/^\d+$/, { message: 'Только цифры' })
  password: string;

  @IsUrl({}, { message: 'Некорректный формат url' })
  @IsOptional()
  url: string;
}
