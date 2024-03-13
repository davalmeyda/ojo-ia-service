import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: (configService: ConfigType<typeof config>) => {
				const { mongo_uri } = configService;
				return {
					uri: mongo_uri,
					maxPoolSize: 10,
					socketTimeoutMS: 360000,
					// keepAlive: true,
					// keepAliveInitialDelay: 300000,
				};
			},
			inject: [config.KEY],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigType<typeof config>) => {
				return {
					type: 'mariadb',
					host: configService.host,
					port: parseInt(configService.port_db),
					username: configService.user_name,
					password: configService.password ?? null,
					database: configService.database,
					autoLoadEntities: true,
					synchronize: false,
					keepConnectionAlive: true,
				};
			},
			inject: [config.KEY],
		}),
	],
	exports: [TypeOrmModule],
	providers: [],
})
export class DatabaseModule {}
