import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import {uuid} from 'uuidv4'

export default class Product extends BaseModel {
  @column()
  public uuid: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public category: string

  @column()
  public price: number

  @column()
  public stock: number

  @column()
  public created_by: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async createUUID (product: Product) {
    product.uuid = uuid()
  }
}
