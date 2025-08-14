import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
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

  @IsUrl(
    {
      protocols: ['https', 'http'],
      require_port: false,
      require_protocol: true,
      require_valid_protocol: false,
      host_whitelist: ['localhost', 'google.com'],
      host_blacklist: ['test.com'],
    },
    { message: 'Некорректный формат url' },
  )
  @IsOptional()
  url: string;

  @IsUUID('4', { message: 'Неверный формат UUID' })
  @IsOptional()
  userId: string;
}
