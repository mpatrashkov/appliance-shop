import { MigrationInterface, QueryRunner, getRepository } from "typeorm"
import { Admin } from "../entity/Admin"

export class CreateAdminUser1583232396217 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        let admin = new Admin()
        admin.email = "test@gmail.com"
        admin.password = "1234"
        admin.hashPassword()
        admin.role = 0

        let owner = new Admin()
        owner.email = "owner@gmail.com"
        owner.password = "1234"
        owner.hashPassword()
        owner.role = 1

        const adminRepository = getRepository(Admin)
        await adminRepository.save(admin)
        await adminRepository.save(owner)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
