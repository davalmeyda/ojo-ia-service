import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export function generateDocumentacion(app) {
	/** Genera una documentacion para el servicio */
	const mainMod = new DocumentBuilder()
		.setTitle('Mongo Service')
		.setDescription('Mongo Service')
		.setVersion(process.env.APP_VERSION)
		.build();

	const mainDocument = SwaggerModule.createDocument(app, mainMod, {
		include: [AppModule],
	});

	SwaggerModule.setup('/docs', app, mainDocument);
}
