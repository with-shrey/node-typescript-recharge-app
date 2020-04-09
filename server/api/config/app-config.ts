export const AppConfig = {
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    CLIENT_HOST: process.env.CLIENT_HOST || 'localhost:4200',
    JWT_SECRET: process.env.JWT_SECRET || 'very-strong-secret'
};
