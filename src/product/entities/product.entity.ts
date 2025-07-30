import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    height: number;

    @Prop({ required: true })
    length: number;


    @Prop({ required: true })
    width: number;

    @Prop({ required: true })
    price: number;

    @Prop({ default: () => new Date() })
    created_at: Date;

    @Prop({ default: () => new Date() })
    updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
