export default () => ({
    guardian: {
        url: process.env.GUARDIAN_URL || 'http://3.93.78.104:3000',
        login: '/api/v1/accounts/login',
        register: '/api/v1/accounts/register',
        accessToken: '/api/v1/accounts/access-token',
        profileUpdate: '/api/v1/profiles/push',
        policyAsign1: '/api/v1/permissions/users',
        policyAsign2: '/policies/assign',
        policies: '/api/v1/policies/',
    },
    policy: {
        id: '6789df72cb0885d35f1ea406',
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
            group: {
                group: 'create_organization',
                Developer: 'developer_organization_creation',
                Government: 'government_organization_creation',
                Ministry: 'ministry_organization_creation',
                Certifier: 'certifier_organization_creation',
            },
            user: {
                group: 'create_organization',
                Admin: '025c7162-eb96-42ee-8006-77eab9f49bc1',
                Manager: '80d7e724-d384-4f28-8d1c-928c98ff3dd6',
                Viewer: '8adb65a5-41f9-44b9-961c-519eb9e17cc1',
            },
        },
        registration: {
            government_admin: 'government_admin_registration',
        },
        approve: {
            Government: 'deaac808-b54b-4b1b-9b30-1073cea2777d',
            Developer: '5abbc45b-66b3-4dc7-9c4e-388c3d4742f5',
            Certifier: 'da3f24d8-8487-4b8c-aa21-5d91d53f3d54', //certifier_approve_button
        },
        invite: {
            Government: 'government_root_group_manager', // government_group
            Developer: '28087482-b819-49d4-aeb6-93ee6f504007', // developer_group
            Ministry: 'ministry_organization_creation',
            Certifier: '691b308e-d331-481e-9470-84c75226dd34', // certifier_group
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
