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
        id: '6789df72cb0885d35f1ea406',
        groupSelection: 'b302e3c2-d8da-4931-a8a0-2b37e4902273',
        topicId: '0.0.5399398',
    },
    sru: {
        username: 'amilareg',
        password: '123456',
        did: 'did:hedera:testnet:Hd3Q9whzRsi8YbEuJDVt1pnixzLJ888HhCBoa2Ba8TCi_0.0.5399395',
    },
    root: {
        username: 'rootuser',
        password: '123456',
    },
    blocks: {
        create: {
            group: '6dd841be-d0a5-45f5-ba74-0790d837f939', //policyRolesBlock
            Developer: 'ba080996-3118-4f35-95f1-bdcabbcbe7d0', //developer_org_steps
            Government: '80d7e724-d384-4f28-8d1c-928c98ff3dd6',
            Certifier: '8adb65a5-41f9-44b9-961c-519eb9e17cc1', //certifier_org_steps
        },
        approve: {
            Government: 'deaac808-b54b-4b1b-9b30-1073cea2777d', //government_approve_button
            Developer: '5abbc45b-66b3-4dc7-9c4e-388c3d4742f5', //developer_approve_button
            Certifier: 'da3f24d8-8487-4b8c-aa21-5d91d53f3d54', //certifier_approve_button
        },
        invite: {
            Government: 'a2523f6d-920e-4bb2-a9f8-295eda8bb19f', // government_group
            Developer: 'c0d9fdc2-799b-46bd-a103-378d1aab20c2', // developer_group
            Certifier: 'b6bd824e-e534-4c52-a31d-eb77859cef9c', // certifier_group
        },
    },
    metadata: {
        approve: {
            tag: {
                Developer: 'save_pending_dev_org',
            },
            type: {
                Developer: 'developer',
            },
            sourceTag: {
                Developer: 'pending_developer_orgs',
            },
        },
    },
});
