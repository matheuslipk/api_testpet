import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import {uuid} from 'uuidv4'
import User from 'App/Models/User'

export default class Product extends BaseModel {
  @column({isPrimary: true})
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
  public user_uuid: string

  @hasOne(()=>User, {localKey: 'user_uuid', foreignKey: 'uuid'})
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async createUUID (product: Product) {
    product.uuid = uuid()
  }
}
