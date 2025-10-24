import dotenv from 'dotenv';
dotenv.config();


export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/aerochat',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    FROM_EMAIL: process.env.FROM_EMAIL,
    APP_PASSWORD: process.env.APP_PASSWORD,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV,
    ARCJET_KEY: process.env.ARCJET_KEY,
};