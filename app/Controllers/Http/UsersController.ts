import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from '../../Validators/UserValidator'
import User from '../../Models/User'

export default class UsersController {
  public async create ({request}:HttpContextContract){
    const validated = await request.validate(UserValidator)
    return await User.create(validated)
  }
}
