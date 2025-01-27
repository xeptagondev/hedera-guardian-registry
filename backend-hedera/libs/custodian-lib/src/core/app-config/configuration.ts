export default () => ({
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
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
        id: '6797595071e846be0ff6843b',
        topicId: '0.0.5433426',
    },
    sru: {
        username: 'amilareg',
        password: '123456',
        did: 'did:hedera:testnet:Hd3Q9whzRsi8YbEuJDVt1pnixzLJ888HhCBoa2Ba8TCi_0.0.5433423',
    },

    blocks: {
        group: {
            group: 'create_organization',
            Developer: 'developer_organization_creation',
            Government: 'government_organization_creation',
            Ministry: 'ministry_organization_creation',
            Certifier: 'certifier_organization_creation',
        },
        user: {
            Developer: 'developer_root_registration',
            Government: 'government_root_registration',
            Ministry: 'ministry_root_registration',
            Certifier: 'certifier_root_registration',
        },

        registration: {
            government_admin: 'government_admin_registration',
            government_manager: 'government_manager_registration',
            government_viewer: 'government_viewer_registration',
            ministry_admin: 'ministry_admin_registration',
            ministry_manager: 'ministry_manager_registration',
            ministry_viewer: 'ministry_viewer_registration',
            certifier_admin: 'certifier_admin_registration',
            certifier_manager: 'certifier_manager_registration',
            certifier_viewer: 'certifier_viewer_registration',
            developer_admin: 'developer_admin_registration',
            developer_manager: 'developer_manager_registration',
            developer_viewer: 'developer_viewer_registration',
        },
        approve: {
            Developer: 'developer_organization_approve_reject_button',
            Ministry: 'ministry_organization_approve_reject_button',
            Certifier: 'certifier_organization_approve_reject_button',
        },
        invite: {
            Government: 'government_root_group_manager',
            Developer: 'developer_root_group_manager',
            Ministry: 'ministry_root_group_manager',
            Certifier: 'certifier_root_group_manager',
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
