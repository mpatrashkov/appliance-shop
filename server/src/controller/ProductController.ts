import { Request, Response } from "express"
import { Product } from "../entity/Product"
import { getRepository } from "typeorm"
import { Model } from "../entity/Model"
import { Category } from "../entity/Category"
import { DynamicOptionValue } from "../entity/DynamicOptionValue"
import { DynamicOption } from "../entity/DynamicOption"

class ProductController {
    productRepository = getRepository(Product)
    modelRepository = getRepository(Model)
    categoryRepository = getRepository(Category)
    dynamicOptionRepository = getRepository(DynamicOption)
    dynamicOptionValueRepository = getRepository(DynamicOptionValue)

    getAll = async (req: Request, res: Response) => {
        const products = await this.productRepository.find({
            relations: [
                "category",
                "category.parent",
                "model",
                "model.brand",
                "dynamicOptionsValues",
                "dynamicOptionsValues.dynamicOption"
            ],
            order: {
                id: "ASC"
            }
        })
        res.send(products)
    }

    add = async (req: Request, res: Response) => {
        const {
            name,
            price,
            description,
            model: modelData,
            category: categoryData,
            dynamicOptionsValues: dynamicOptionsValuesData
        } = req.body

        const { id: modelId } = modelData
        const { id: categoryId } = categoryData

        if (!(name && price && description && modelId && categoryId)) {
            res.sendStatus(400)
            return
        }

        const model = await this.modelRepository.findOne({
            where: {
                id: modelId
            }
        })

        if (!model) {
            res.sendStatus(400)
            return
        }

        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            res.sendStatus(400)
            return
        }

        const product = new Product()
        product.name = name
        product.price = price
        product.description = description
        product.model = model
        product.category = category
        product.archived = false
        product.deleted = false

        const dynamicOptionsValues = []
        for (const dynamicOptionValueData of dynamicOptionsValuesData || []) {
            const dynamicOptionValue = new DynamicOptionValue()
            const id = dynamicOptionValueData.dynamicOption.id

            const dynamicOption = await this.dynamicOptionRepository.findOne({
                where: { id }
            })
            if (!dynamicOption) {
                res.sendStatus(400)
                return
            }

            dynamicOptionValue.dynamicOption = dynamicOption
            dynamicOptionValue.value = dynamicOptionValueData.value

            dynamicOptionsValues.push(dynamicOptionValue)
        }
        // await this.dynamicOptionValueRepository.save(dynamicOptionsValues)

        product.dynamicOptionsValues = dynamicOptionsValues
        await this.productRepository.save(product)

        res.send(product)
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.sendStatus(400)
            return
        }

        const result = await this.productRepository.delete({
            id: parseInt(id)
        })

        res.send(result)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params

        const {
            name,
            price,
            description,
            model: modelData,
            category: categoryData,
            dynamicOptionsValues: dynamicOptionsValuesData
        } = req.body

        const { id: modelId } = modelData
        const { id: categoryId } = categoryData

        if (!(name && price && description && modelId && categoryId)) {
            console.log({ name, price, description, modelId, categoryId })
            res.sendStatus(400)
            return
        }

        const product = await this.productRepository.findOne({
            relations: [
                "dynamicOptionsValues",
                "dynamicOptionsValues.dynamicOption"
            ],
            where: {
                id
            }
        })

        const model = await this.modelRepository.findOne({
            where: {
                id: modelId
            }
        })

        if (!model) {
            res.sendStatus(400)
            return
        }

        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            res.sendStatus(400)
            return
        }

        product.name = name
        product.price = price
        product.description = description
        product.model = model
        product.category = category

        for (const dynamicOptionValue of product.dynamicOptionsValues) {
            dynamicOptionValue.value = dynamicOptionsValuesData.find(
                data =>
                    data.dynamicOption.id ===
                    dynamicOptionValue.dynamicOption.id
            ).value
        }

        for (const dynamicOptionValue of dynamicOptionsValuesData) {
            const dynOption = product.dynamicOptionsValues.find(
                it =>
                    it.dynamicOption.id === dynamicOptionValue.dynamicOption.id
            )
            if (dynOption) {
                dynOption.value = dynamicOptionValue.value
            } else {
                const option = await this.dynamicOptionRepository.findOne({
                    where: {
                        id: dynamicOptionValue.dynamicOption.id
                    }
                })

                const optionValue = new DynamicOptionValue()
                optionValue.value = dynamicOptionValue.value
                optionValue.dynamicOption = option

                product.dynamicOptionsValues.push(optionValue)
            }
        }

        await this.productRepository.save(product)
        res.send(product)
    }
}

export default ProductController
