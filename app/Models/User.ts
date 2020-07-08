import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import {uuid} from 'uuidv4'
import Hash from '@ioc:Adonis/Core/Hash'
import Product from 'App/Models/Product'

export default class User extends BaseModel {
  @column({isPrimary: true})
  public uuid: string

  @column()
  public name: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Product)
  public products: HasMany<typeof Product>

  @beforeSave()
  public static async createUUID (user: User) {
    user.uuid = uuid()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
