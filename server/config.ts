import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './.env')})

interface ENV {
    SECRET: string | undefined;
    EXPIRATION: string | undefined;
    MONGODB_URI: string | undefined;
    PORT: number | undefined;
    NODE_ENV: string | undefined;
}

interface Config {
    SECRET: string;
    EXPIRATION: string;
    MONGODB_URI: string;
    PORT: number;
    NODE_ENV: string;
}

const getConfig = (): ENV => {
    return {
        SECRET: process.env.SECRET,
        EXPIRATION: process.env.EXPIRATION,
        MONGODB_URI: process.env.MONGODB_URI,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        NODE_ENV: process.env.NODE_ENV
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
export default sanitizedConfig;