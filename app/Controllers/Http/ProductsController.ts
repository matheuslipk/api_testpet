import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductValidator from '../../Validators/ProductValidator'
import Product from '../../Models/Product'

export default class ProductsController {
  public async index ({request}:HttpContextContract){
    let {page, name, description, category} = request.all()
    if(!page || page<1){
      page=1
    }
    const products = await Product
      .query()
      .whereRaw(`name LIKE '%${name || ''}%'`)
      .whereRaw(`description LIKE '%${description || ''}%'`)
      .whereRaw(`category LIKE '%${category || ''}%'`)
      .paginate(page,10)
    return products.toJSON()
  }

  public async create ({request}:HttpContextContract){
    const validated = await request.validate(ProductValidator)
    const product = await Product.create({
      ...validated,
      created_by:request.tokenInfo?.uuid,
    })
    return product
  }

  public async update ({request, params}:HttpContextContract){
    const validated = await request.validate(ProductValidator)
    const updated = await Product.query().where({
      uuid: params.product_id,
    }).update(validated)
    return updated
  }

  public async delete ({params}:HttpContextContract){
    const deleted = await Product.query().where({
      uuid: params.product_id,
    }).delete()
    return deleted
  }
}
