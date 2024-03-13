import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Device extends Document {
	@Prop()
	userId: number;

	@Prop({ unique: true })
	uuid: string;

	@Prop({ default: 'v1.0.0' })
	version: string;

	@Prop()
	lastConnection: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
