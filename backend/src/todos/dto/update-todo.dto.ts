import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
