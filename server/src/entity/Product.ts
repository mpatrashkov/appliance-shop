import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm"
import { Model } from "./Model"
import { DynamicOptionValue } from "./DynamicOptionValue"
import { Category } from "./Category"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

    @Column({ nullable: true })
    image: string

    @Column()
    archived: boolean

    @Column()
    deleted: boolean

    @ManyToOne(type => Category)
    category: Category

    @ManyToOne(type => Model)
    model: Model

    @OneToMany(
        type => DynamicOptionValue,
        dynamicOptionValue => dynamicOptionValue.product,
        {
            cascade: true
        }
    )
    dynamicOptionsValues: DynamicOptionValue[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}
