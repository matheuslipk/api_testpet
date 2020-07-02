import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionValidator from '../../Validators/SessionValidator'
import User from '../../Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

export default class SessionsController {
  public async create ({request, response}:HttpContextContract){
    const validated = await request.validate(SessionValidator)
    const APP_KEY = Env.get('APP_KEY') as string

    const user = await User.query().where({email: validated.email}).first()

    if(!user){
      return response.unauthorized({error: 'email not found'})
    }
    const isMatch = await Hash.verify(user.password, validated.password)
    if(!isMatch){
      return response.unauthorized({error: 'password wrong'})
    }

    const token = jwt.sign({
      uuid: user.uuid,
    }, APP_KEY, { expiresIn: '2h' })

    return {
      token,
      user,
    }
  }
}
