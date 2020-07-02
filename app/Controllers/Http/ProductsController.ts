import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductValidator from '../../Validators/ProductValidator'
import Product from '../../Models/Product'

export default class ProductsController {
  public async create ({request}:HttpContextContract){
    const validated = await request.validate(ProductValidator)
    const product = await Product.create(validated)
    return product
  }
}
