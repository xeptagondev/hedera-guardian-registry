/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustodianDBPopulate1737524138690 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        // Add roles
        await queryRunner.query(
            "INSERT INTO role_entity (name) VALUES ('ROOT'), ('ADMIN'), ('MANAGER'), ('VIEWER');",
        );

        // Add organization types
        await queryRunner.query(
            "INSERT INTO organization_type_entity (name) \
            VALUES ('GOVERNMENT'), ('MINISTRY'), ('DEVELOPER'), ('CERTIFIER');",
        );

        // Add main gov organization
        await queryRunner.query(
            "INSERT INTO organization_entity (name, organization_type_id) \
            VALUES ('Test Government',(SELECT id FROM organization_type_entity WHERE name='GOVERNMENT'));",
        );

        // Add guardian roles
        await queryRunner.query(
            "INSERT INTO guardian_role_entity (name, role_id, organization_type_id) \
            VALUES \
            ( \
                'GOVERNMENT_ROOT', \
                (SELECT id FROM role_entity WHERE name='ROOT'), \
                (SELECT id FROM organization_type_entity WHERE name='GOVERNMENT') \
            ), \
            ( \
                'GOVERNMENT_ADMIN', \
                (SELECT id FROM role_entity WHERE name='ADMIN'), \
                (SELECT id FROM organization_type_entity WHERE name='GOVERNMENT')\
            ), \
            ( \
                'GOVERNMENT_MANAGER', \
                (SELECT id FROM role_entity WHERE name='MANAGER'), \
                (SELECT id FROM organization_type_entity WHERE name='GOVERNMENT')\
            ), \
            ( \
                'GOVERNMENT_VIEWER', \
                (SELECT id FROM role_entity WHERE name='VIEWER'), \
                (SELECT id FROM organization_type_entity WHERE name='GOVERNMENT')\
            ), \
            ( \
                'MINISTRY_ADMIN', \
                (SELECT id FROM role_entity WHERE name='ADMIN'), \
                (SELECT id FROM organization_type_entity WHERE name='MINISTRY')\
            ), \
            ( \
                'MINISTRY_MANAGER', \
                (SELECT id FROM role_entity WHERE name='MANAGER'), \
                (SELECT id FROM organization_type_entity WHERE name='MINISTRY')\
            ), \
            ( \
                'MINISTRY_VIEWER', \
                (SELECT id FROM role_entity WHERE name='VIEWER'), \
                (SELECT id FROM organization_type_entity WHERE name='MINISTRY')\
            ), \
            ( \
                'DEVELOPER_ADMIN', \
                (SELECT id FROM role_entity WHERE name='ADMIN'), \
                (SELECT id FROM organization_type_entity WHERE name='DEVELOPER')\
            ), \
            ( \
                'DEVELOPER_MANAGER', \
                (SELECT id FROM role_entity WHERE name='MANAGER'), \
                (SELECT id FROM organization_type_entity WHERE name='DEVELOPER')\
            ), \
            ( \
                'DEVELOPER_VIEWER', \
                (SELECT id FROM role_entity WHERE name='VIEWER'), \
                (SELECT id FROM organization_type_entity WHERE name='DEVELOPER')\
            ), \
            ( \
                'CERTIFIER_ADMIN', \
                (SELECT id FROM role_entity WHERE name='ADMIN'), \
                (SELECT id FROM organization_type_entity WHERE name='CERTIFIER')\
            ), \
            ( \
                'CERTIFIER_MANAGER', \
                (SELECT id FROM role_entity WHERE name='MANAGER'), \
                (SELECT id FROM organization_type_entity WHERE name='CERTIFIER')\
            ), \
            ( \
                'CERTIFIER_VIEWER', \
                (SELECT id FROM role_entity WHERE name='VIEWER'), \
                (SELECT id FROM organization_type_entity WHERE name='CERTIFIER')\
            );",
        );

        // Add gov root user
        await queryRunner.query(
            "INSERT INTO users_entity ( \
                email, \
                name, \
                password, \
                phone_number, \
                organization_id, \
                guardian_role_id\
            ) \
            VALUES ( \
                'root@testgov.com', \
                'Test Gov Root', \
                '123456', \
                '0112456789', \
                (SELECT id FROM organization_entity WHERE name='Test Government'), \
                (SELECT id FROM guardian_role_entity WHERE name='GOVERNMENT_ROOT') \
            );",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
