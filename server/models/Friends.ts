import { Schema, model, Types } from 'mongoose';
import { IUser } from './User'

export interface IFriends {

}

const schema = new Schema<IFriends>({
   
}, { timestamps: true})

const Friends = model<IFriends>('Friends', schema);
export default Friends;