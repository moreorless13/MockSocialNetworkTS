import { Schema, model, Types } from 'mongoose';



interface IUserInfos {
    firstName: string;
    lastName: string;

}

const schema = new Schema<IUserInfos>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

})



