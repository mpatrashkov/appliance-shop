import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { DynamicOption } from "./DynamicOption"
import { Product } from "./Product"

@Entity()
export class DynamicOptionValue {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: string

    @ManyToOne(type => DynamicOption, { cascade: true })
    dynamicOption: DynamicOption

    @ManyToOne(type => Product)
    product: Product
}
