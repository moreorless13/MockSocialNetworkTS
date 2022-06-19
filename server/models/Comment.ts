import { CommonEvents } from 'mongodb';
import { Schema, model, Model, Types } from 'mongoose';

export interface IComment {
    _id: Types.ObjectId;
    text: string;
    author: string;
    createdAt: Date;
    owner: Types.ObjectId;
}

const schema = new Schema<IComment>({
    text: { type: String, required: true, minlength: 1, maxlength: 255 },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Comment = model<IComment>('Comment', schema);
export default Comment;