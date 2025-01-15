export default () => ({
    custodian: {
        url: process.env.CUSTODIAN_URL || 'http://127.0.0.1:3002',
        login: '/user/login',
    },
});
