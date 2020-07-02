import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import {uuid} from 'uuidv4'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column()
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

  @beforeSave()
  public static async createUUID (user: User) {
    user.uuid = uuid()
    if (user.$dirty.password) {
      user.password = await Hash.hash(user.password)
    }
  }
}
