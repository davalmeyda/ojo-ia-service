import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Version extends Document {
	@Prop()
	version_1: number;

	@Prop()
	version_2: number;

	@Prop()
	version_3: number;
}

export const VersionSchema = SchemaFactory.createForClass(Version);
