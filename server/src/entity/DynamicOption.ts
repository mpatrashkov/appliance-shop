import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
} from "typeorm"
import { Category } from "./Category"

@Entity()
export class DynamicOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    suffix: string

    @Column()
    type: string

    @Column({ nullable: true })
    label: string | null
}
