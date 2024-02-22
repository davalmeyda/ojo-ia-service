import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
	imports: [
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
