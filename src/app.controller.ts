import { Controller, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@nestjs/common/decorators';
import { SqlDto } from './app.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post()
	@ApiOperation({ summary: 'Ejecuta una consulta SQL' })
	exectSql(@Body() dto: SqlDto) {
		console.log('dto', dto.sql);
		return this.appService.exectSql(dto.sql);
	}
}
