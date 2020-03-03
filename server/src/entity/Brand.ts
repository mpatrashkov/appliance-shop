import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Model } from "./Model"

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(
        type => Model,
        model => model.brand
    )
    models: Model[]
}
