// backend/src/tasks/dto/update-task.dto.ts
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

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
  dueDate?: string;

  @IsOptional()
  @IsEnum(['low', 'middle', 'high'])
  priority?: 'low' | 'middle' | 'high';
}
