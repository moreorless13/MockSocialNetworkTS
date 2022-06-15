import { Schema, model, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate'


interface IUserInfos {
    firstName: string;
    lastName: string;

}

const schema = new Schema<IUserInfos>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

})



