import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';

@Controller('ia')
@ApiTags('IA')
export class IAController {
	@Post('extractInfoVoucher')
	@ApiOperation({ summary: 'Extraer información de un Voucher' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'File upload',
		type: 'multipart/form-data',
		required: true,
		schema: {
			type: 'object',
			properties: {
				image3: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('image3', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const originalName = path.parse(file.originalname).name;
					const extension = path.extname(file.originalname);
					cb(null, `${originalName}-${uniqueSuffix}${extension}`);
				},
			}),
		}),
	)
	async extractInfoVoucher(@UploadedFile() file3: Express.Multer.File) {
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const file3Upload = await openai.files.create({
			file: fs.createReadStream(file3.path),
			purpose: 'assistants',
		});

		const thread = await openai.beta.threads.create({
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'image_file',
							image_file: { file_id: file3Upload.id },
						},
						{
							type: 'text',
							text: 'Extrae la información de la imagen de acuerdo a todos los parametros que te he mencionado',
						},
					],
				},
			],
		});

		const run = await openai.beta.threads.runs.create(thread.id, {
			assistant_id: 'asst_uJTaDQDP6KA6yvpJhAMkEhXi',
		});

		let runStatus = run.status;
		while (runStatus === 'queued' || runStatus === 'in_progress') {
			console.log('Waiting for run to complete...');
			await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5 segundos
			const updatedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
			runStatus = updatedRun.status;
			if (runStatus === 'completed') {
				console.log('Run completed!');
				const data = await openai.beta.threads.messages.list(thread.id);
				console.log('Data:', data.data[0].content[0]['text']['value']);
				return JSON.parse(data.data[0].content[0]['text']['value']);
			} else if (runStatus === 'failed') {
				console.log('Run failed:', updatedRun.last_error);
				throw new Error('Run failed');
			}
		}
	}

	@Post('test')
	@ApiOperation({ summary: 'Test' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'File upload',
		type: 'multipart/form-data',
		required: true,
		schema: {
			type: 'object',
			properties: {
				image3: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('image3', {
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					const originalName = path.parse(file.originalname).name;
					const extension = path.extname(file.originalname);
					cb(null, `${originalName}-${uniqueSuffix}${extension}`);
				},
			}),
		}),
	)
	async test(@UploadedFile() file3: Express.Multer.File) {
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const filePath1 = path.join(__dirname, '..', '/imagen1.jpeg');
		const filePath2 = path.join(__dirname, '..', '/imagen2.jpeg');

		const file1 = await openai.files.create({
			file: fs.createReadStream(filePath1),
			purpose: 'assistants',
		});
		const file2 = await openai.files.create({
			file: fs.createReadStream(filePath2),
			purpose: 'assistants',
		});
		const file3Upload = await openai.files.create({
			file: fs.createReadStream(file3.path),
			purpose: 'assistants',
		});

		const thread = await openai.beta.threads.create({
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'image_file',
							image_file: { file_id: file1.id },
						},
						{
							type: 'image_file',
							image_file: { file_id: file2.id },
						},
						{
							type: 'image_file',
							image_file: { file_id: file3Upload.id },
						},
						{
							type: 'text',
							text: 'Compara las fotos respetando todo lo que te mencione',
						},
					],
				},
			],
		});

		const run = await openai.beta.threads.runs.create(thread.id, {
			assistant_id: 'asst_0Lmqn79FYSy2uu7KaCsxuTLD',
		});

		let runStatus = run.status;
		while (runStatus === 'queued' || runStatus === 'in_progress') {
			console.log('Waiting for run to complete...');
			await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 5 segundos
			const updatedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
			runStatus = updatedRun.status;
			if (runStatus === 'completed') {
				console.log('Run completed!');
				const data = await openai.beta.threads.messages.list(thread.id);
				console.log('Data:', data.data[0].content[0]['text']['value']);
				return JSON.parse(data.data[0].content[0]['text']['value']);
			} else if (runStatus === 'failed') {
				console.log('Run failed:', updatedRun.last_error);
				throw new Error('Run failed');
			}
		}
	}
}
