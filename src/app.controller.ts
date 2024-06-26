import { Controller, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Get, Post } from '@nestjs/common/decorators';
import { SqlDto } from './app.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Activo' })
	async activo() {
		return 'Activo';
	}

	@Post()
	@ApiOperation({ summary: 'Ejecuta una consulta SQL' })
	exectSql(@Body() dto: SqlDto) {
		console.log('dto', dto.sql);
		return this.appService.exectSql(dto.sql);
	}

	@Get('version')
	@ApiOperation({ summary: 'Get current version' })
	async getCurrentVersion() {
		const version = await this.appService.version_getCurrentVersion();
		return version;
	}

	@Get('devices/actualizados/count')
	@ApiOperation({ summary: 'Get devices' })
	async getDevicesActualizadosCount() {
		return (await this.appService.devices(1)).length;
	}

	@Get('devices/actualizados')
	@ApiOperation({ summary: 'Get devices' })
	async getDevicesActualizados() {
		return this.appService.devices(1);
	}

	@Get('devices/desactualizados/count')
	@ApiOperation({ summary: 'Get devices' })
	async getDevicesDesactualizadosCount() {
		return (await this.appService.devices(0)).length;
	}

	@Get('devices/desactualizados')
	@ApiOperation({ summary: 'Get devices' })
	async getDevicesDesactualizados() {
		return this.appService.devices(0);
	}

	@Get('devices/versiones')
	@ApiOperation({ summary: 'Get devices' })
	async getDevicesVersiones() {
		return this.appService.versiones();
	}
}
