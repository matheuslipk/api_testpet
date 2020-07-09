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
      .where({user_uuid: request.tokenInfo?.uuid})
      .whereRaw(`name LIKE '%${name || ''}%'`)
      .whereRaw(`description LIKE '%${description || ''}%'`)
      .whereRaw(`category LIKE '%${category || ''}%'`)
      .orderBy('created_at', 'desc')
      .paginate(page, 10)
    return products.toJSON()
  }

  public async show ({response, params}:HttpContextContract){
    let {id} = params

    const product = await Product.findBy('uuid', id)

    if(product){
      return product.toJSON()
    }else{
      return response.notFound({error: 'Product not found'})
    }
  }

  public async create ({request}:HttpContextContract){
    const validated = await request.validate(ProductValidator)
    const product = await Product.create({
      ...validated,
      user_uuid:request.tokenInfo?.uuid,
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

  public async delete ({params, response}:HttpContextContract){
    const [deleted] = await Product.query().where({
      uuid: params.product_id,
    }).delete()
    if(!deleted){
      return response.notFound({error: 'Não foi possivel realizar essa ação'})
    }
    return deleted
  }
}
