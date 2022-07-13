
import { Schema, model, Types, Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import Post, { IPost } from './Post';

export interface Ifollowers {
    _id: Types.ObjectId;
    username: string;
    email: string;
}

export interface Ifollowing {
    _id: Types.ObjectId;
    username: string;
    email: string;
}

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    accountStatus: string;
    role: string; 
    followers: Types.DocumentArray<Ifollowers>;
    following: Types.DocumentArray<Ifollowing>;
    posts?: Types.DocumentArray<IPost>;
}

interface UserMethods {
    isCorrectPassword(password: string): any;
}

type UserModel = Model<IUser, {}, UserMethods>

const schema = new Schema<IUser, UserModel, UserMethods>({
    username: { type: String, required: true, unique: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must match an email address'] },
    password: { type: String, required: true, minlength: 5 },
    dateOfBirth: { type: Date, required: true },
    accountStatus: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    role: { type: String, required: true, enum: ['Admin', 'User'], default: 'User' },  
    followers: [{ _id: Types.ObjectId, username: String, email: String }],
    following: [{ _id: Types.ObjectId, username: String, email: String }],
    posts: [Post.schema]
}, { timestamps: true });

schema.pre('save', async function (next: any) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next()
})

schema.method('isCorrectPassword', async function isCorrectPassword(password){
    return await bcrypt.compare(password, this.password)
})

const User = model<IUser, UserModel>('User', schema);
export default User;