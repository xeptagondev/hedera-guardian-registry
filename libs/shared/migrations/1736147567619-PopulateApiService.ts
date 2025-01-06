import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class PopulateApiService1736147567619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const initTime = new Date().getTime();

    await queryRunner.query(`INSERT INTO role_entity (name) VALUES 
        ('Root'),
        ('Admin'),
        ('Manager'),
        ('Viewer')`);

    await queryRunner.query(`INSERT INTO organization_type_entity (name) VALUES 
        ('Government'),
        ('Minsitry'),
        ('Certifier'),
        ('Project Participant')`);

    await queryRunner.query(`INSERT INTO "organization_entity" ("name","typeId") VALUES 
        ('Government',1)`);

    await queryRunner.query(`
            INSERT INTO "organization_type_role_entity" ("typeId", "roleId") VALUES
              (1,1),
              (1,2),
              (1,3),
              (1,4),
              (2,2),
              (2,3),
              (2,4),
              (3,2),
              (3,3),
              (3,4),
              (4,2),
              (4,3),
              (4,4)
          `);

    await queryRunner.query(`INSERT INTO "user_entity" ("email","password","name","organizationId","roleId") VALUES 
        ('palinda@xeptagon.com','123','root',1,1)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
