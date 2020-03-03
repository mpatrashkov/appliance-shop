import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm"
import { DynamicOption } from "./DynamicOption"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(
        type => Category,
        category => category.children
    )
    parent: Category

    @OneToMany(
        type => Category,
        category => category.parent,
        {
            cascade: true
        }
    )
    children: Category[]

    @ManyToMany(type => DynamicOption)
    @JoinTable()
    dynamicOptions: DynamicOption[]
}
