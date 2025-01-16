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
            Developer: 'fa086d80-3688-4c48-83a1-8782f2613163',
            Government: '266a2ef3-5efa-4359-ab2f-71f593a30362',
            Certifier: '9813cba6-1a5e-47aa-8fe4-6db2de098b6d',
        },
        approve: {
            Government: '04512c9d-770d-4cd8-bbf2-30c68c0fa656',
            Developer: '1a757d5b-153a-4b8c-9093-ddc55ae33060',
            Certifier: '0d9011fe-0751-4bbe-ab7f-243e359ef880',
        },
    },
});
