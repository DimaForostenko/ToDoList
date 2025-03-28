import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string; // Використовуємо ISO-формат (наприклад, "2025-04-01")

  @IsOptional()
  @IsEnum(['low', 'middle', 'high'])
  priority?: 'low' | 'middle' | 'high';
}
