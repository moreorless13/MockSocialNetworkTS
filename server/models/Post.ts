import { Schema, model, Model, Types } from 'mongoose';
import Comment, { IComment } from './Comment';



export interface IPost {
    _id: Types.ObjectId;
    text: string;
    author: string;
    createdAt: Date;
    comments: Types.DocumentArray<IComment>;
}

const schema = new Schema<IPost>({
    text: { type: String, minlength: 1, maxlength: 255, trim: true },
    author: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    comments: [Comment.schema]
}, { timestamps: true })

const Post = model<IPost>('Post', schema);
export default Post;