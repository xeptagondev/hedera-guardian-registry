export default () => ({
    guardian: {
        url: process.env.GUARDIAN_URL || 'http://3.93.78.104:3000',
        login: '/api/v1/accounts/login',
        register: '/api/v1/accounts/register',
        accessToken: '/api/v1/accounts/access-token',
        profileUpdate: '/api/v1/profiles/push/',
        policyAsign1: '/api/v1/permissions/users/',
        policyAsign2: '/policies/assign',
        policies: '/api/v1/policies/',
    },
    policy: {
        id: '678792bd87086fd01a11533c',
        groupSelection: 'b302e3c2-d8da-4931-a8a0-2b37e4902273',
        topicId: '0.0.5394841',
    },
    sru: {
        username: 'amilareg',
        password: '123456',
    },
    root: {
        username: 'rootuser',
        password: '123456',
    },
    blocks: {
        create: {
            group: '2d4dbf94-ac10-442f-96d6-250d6c651621',
            Developer: '7346b2c1-ebe3-4d0d-a848-5940b1de4261',
            Government: 'bd175ee2-e797-4bd8-87d1-cb8366ae08bd',
            Certifier: 'b1766012-a710-4ab7-b193-4e0e4c098f7e',
        },
        approve: {
            Government: '04512c9d-770d-4cd8-bbf2-30c68c0fa656',
            Developer: '25de3585-8796-4018-9d51-e33dea913fbf',
            Certifier: '21261afb-1fc8-4104-861a-46bcca4d21f8',
        },
    },
});
