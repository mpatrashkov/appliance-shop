import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Brand } from "./Brand"

@Entity()
export class Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(
        type => Brand,
        brand => brand.models
    )
    brand: Brand
}
