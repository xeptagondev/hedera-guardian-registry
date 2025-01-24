export default () => ({
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    url: process.env.CUSTODIAN_URL || 'http://127.0.0.1:3002',
    user: {
        login: '/user/login',
        add: '/user/add',
        invite: '/user/invite',
    },
    apiJwt: {
        secret: process.env.API_JWT_SECRET || 'api_jwt_secret',
        expireTimeout: process.env.API_JWT_EXPIRE || '7200s',
        refreshTokenSecret:
            process.env.API_REFRESH_TOKEN_SECRET || 'api_refresh_token_secret',
        refreshTokenExpireTimeout:
            process.env.API_REFRESH_TOKEN_EXPIRE || '7200s',
    },
    organization: {
        approve: '/organization/approve',
    },
});
