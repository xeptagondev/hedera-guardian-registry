export default () => ({
    url: process.env.CUSTODIAN_URL || 'http://127.0.0.1:3002',
    user: {
        login: '/user/login',
        add: '/user/add',
        invite: '/user/invite',
    },
});
