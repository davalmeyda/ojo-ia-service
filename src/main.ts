import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { generateDocumentacion } from './documentacion';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const logger = new Logger('Main');

	// CONFIGURAMOS LA VALIDACION DE LOS DATOS ENVIADOS POR EL CLIENTE
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: false,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	// app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	// HABILITAMOS LOS CORS PARA PODER VISUALIZAR DESDE OTRO DOMINIO
	app.enableCors();

	generateDocumentacion(app);

	app.setGlobalPrefix(process.env.PREFIX ? process.env.PREFIX : '');

	await app.listen(process.env.PORT, () => {
		logger.log(`Server running on port ${process.env.PORT}`);
		logger.log(`Modo ${process.env.NODE_ENV ? process.env.NODE_ENV : 'Desarrollo'}`);
		logger.log(__dirname);
	});
}
bootstrap();
