import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityManager } from 'typeorm';
import { Version } from './entities/version.entity';
import { Model } from 'mongoose';
import { Device } from './entities/device.entity';

@Injectable()
export class AppService {
	constructor(
		private readonly entityManager: EntityManager,
		@InjectModel(Version.name) private versionModel: Model<Version>,
		@InjectModel(Device.name) private deviceModel: Model<Device>,
	) {}
	exectSql(sql: string) {
		return this.entityManager.query(sql);
	}

	async version_getCurrentVersion() {
		const result = await this.versionModel.findOne().exec();
		return result.version_1 + '.' + result.version_2 + '.' + result.version_3;
	}

	async devices(tipo: number) {
		const version = await this.version_getCurrentVersion();

		if (tipo === 1) {
			return this.deviceModel
				.find({
					lastConnection: {
						$gte: new Date(new Date().getTime() - 1000 * 60 * 3), // Últimos 2 minutos
					},
					version: version,
				})
				.exec();
		} else {
			return this.deviceModel
				.find({
					lastConnection: {
						$gte: new Date(new Date().getTime() - 1000 * 60 * 3), // Últimos 2 minutos
					},
					version: { $ne: version },
				})
				.exec();
		}
	}

	async versiones() {
		return this.deviceModel.aggregate([
			{
				$match: {
					lastConnection: {
						$gte: new Date(new Date().getTime() - 1000 * 60 * 3),
					},
				},
			},
			{
				$group: {
					_id: '$version',
					cantidad: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					version: '$_id',
					cantidad: 1,
				},
			},
		]);
	}
}
