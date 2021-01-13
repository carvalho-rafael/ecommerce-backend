/* eslint-disable camelcase */
import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string,
    image: string,
    description: string,
    price: number,
    amount: number,
    category: Schema.Types.ObjectId,
    __v: number,
}

const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
    },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
