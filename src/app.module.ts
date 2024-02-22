import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config, { validation } from './config/config';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			// * Definimos que es global
			isGlobal: true,
			// * Definimos el archivo de configuracion
			envFilePath: '.env',
			// * Definimos el esquema y la validacion
			load: [config],
			validationSchema: Joi.object(validation),
		}),
		DatabaseModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
