import { Schema, model, Types } from 'mongoose';



interface IUserInfos {
    firstName: string;
    lastName: string;
    gender: string;

}

const schema = new Schema<IUserInfos>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['Female', 'Male', 'Other'] }
})



