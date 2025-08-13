import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Не должно быть пустым' })
  @Length(3, 20, {
    message: 'Длинна должна быть в верном диапазоне от 3 до 20 символов',
  })
  title: string;
  @IsBoolean({message: 'Статус должен быть boolean выражением'})
  isCompleted: boolean;
}
