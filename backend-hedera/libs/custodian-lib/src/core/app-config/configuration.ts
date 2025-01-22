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
        id: '6790a931671ff72cb9b56754',
        topicId: '0.0.5415758',
    },
    sru: {
        username: 'amilareg',
        password: '123456',
        did: 'did:hedera:testnet:Hd3Q9whzRsi8YbEuJDVt1pnixzLJ888HhCBoa2Ba8TCi_0.0.5415745',
    },

    blocks: {
        group: {
            group: 'create_organization',
            DEVELOPER: 'developer_organization_creation',
            GOVERNMENT: 'government_organization_creation',
            MINISTRY: 'ministry_organization_creation',
            CERTIFIER: 'certifier_organization_creation',
        },
        user: {
            DEVELOPER: 'developer_root_registration',
            GOVERNMENT: 'government_root_registration',
            MINISTRY: 'ministry_root_registration',
            CERTIFIER: 'certifier_root_registration',
        },

        registration: {
            government_admin: 'government_admin_registration',
        },
        approve: {
            DEVELOPER: 'developer_organization_approve_reject_button',
            MINISTRY: 'ministry_organization_approve_reject_button',
            CERTIFIER: 'certifier_organization_approve_reject_button',
        },
        invite: {
            GOVERNMENT: 'government_root_group_manager',
            DEVELOPER: 'developer_root_group_manager',
            MINISTRY: 'ministry_root_group_manager',
            CERTIFIER: 'certifier_root_group_manager',
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
