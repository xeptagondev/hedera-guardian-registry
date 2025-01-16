export default () => ({
    guardian: {
        url: process.env.GUARDIAN_URL || 'http://3.93.78.104:3000',
        login: '/api/v1/accounts/login',
        register: '/api/v1/accounts/register',
        accessToken: '/api/v1/accounts/access-token',
        profileUpdate: '/api/v1/profiles/push/',
    },
    policy: {
        id: '678792bd87086fd01a11533c',
        groupSelection: 'b302e3c2-d8da-4931-a8a0-2b37e4902273',
    },
    sru: {
        username: 'amilareg',
        password: '123456',
    },
    root: {
        username: 'root',
        password: '123456',
    },
});
