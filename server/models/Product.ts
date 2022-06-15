
import { Schema, model,  } from 'mongoose';

interface IProduct {
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
}

const schema = new Schema<IProduct>({
    name: { type: String, required: true, trim: true}, 
    description: { type: String },
    image: { type: String }, 
    price: { type: Number, required: true, min: 0.99 },
    quantity: { type: Number, required: true, min: 0, default: 0 }
})

const Product = model<IProduct>('Product', schema);
export default Product;