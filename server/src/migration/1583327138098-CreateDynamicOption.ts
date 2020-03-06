import { MigrationInterface, QueryRunner, getRepository } from "typeorm"
import { DynamicOption } from "../entity/DynamicOption"

export class CreateDynamicOption1583327138098 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const dynamicOptionRepository = getRepository(DynamicOption)
        const dynamicOption = new DynamicOption()
        dynamicOption.name = "Coolness"
        dynamicOption.type = "string"

        await dynamicOptionRepository.save(dynamicOption)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
