/* eslint-disable camelcase */
import mongoose, { Document } from 'mongoose';

interface IProductCategory extends Document {
    name: string,
    description?: string,
    __v?: number,
}

const ProductCategorySchema = new mongoose.Schema<IProductCategory>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IProductCategory>('ProductCategory', ProductCategorySchema);
