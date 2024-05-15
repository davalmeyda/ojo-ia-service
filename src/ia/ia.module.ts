import { Module } from '@nestjs/common';
import { IAController } from './ia.controller';

@Module({
	controllers: [IAController],
})
export class IaModule {}
