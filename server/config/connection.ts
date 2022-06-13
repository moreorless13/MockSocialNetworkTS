import 'dotenv/config';
import mongoose from 'mongoose';
import sanitizedConfig from '../config';

const uri = sanitizedConfig.MONGODB_URI;

const handleConnectionError = (error: any) => {
    mongoose.connection.on('error', error => {
        console.log(error)
    })
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        handleConnectionError(error)
    }
}
export default connectToDatabase;