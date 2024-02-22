import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
	constructor(private readonly entityManager: EntityManager) {}
	exectSql(sql: string) {
		return this.entityManager.query(sql);
	}
}
