const config = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'mamamiav',
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    SECRET_KEY: process.env.SECRET_KEY || 'a4=#gFa3%+cHe3,}|',
};
export default config;
