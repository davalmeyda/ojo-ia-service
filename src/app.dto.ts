import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SqlDto {
	@IsString()
	@ApiProperty()
	sql: string;
}
