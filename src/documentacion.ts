import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IaModule } from './ia/ia.module';

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

	/** Genera una documentacion para el modulo IA */
	const iaMod = new DocumentBuilder()
		.setTitle('IA Service')
		.setDescription('IA Service')
		.setVersion(process.env.APP_VERSION)
		.build();

	const iaDocument = SwaggerModule.createDocument(app, iaMod, {
		include: [IaModule],
	});

	SwaggerModule.setup('/docs/ia', app, iaDocument);
}
