import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

import * as bcrypt from "bcryptjs"

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    @Length(4, 100)
    password: string

    @Column()
    @IsNotEmpty()
    role: number

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}
