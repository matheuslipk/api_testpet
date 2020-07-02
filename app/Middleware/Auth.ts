import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import { TokenInfo } from '@ioc:Adonis/Core/Request'

export default class Auth {
  public async handle ({request, response}: HttpContextContract, next: () => Promise<void>) {
    const authorization = request.header('authorization')

    if (!authorization) {
      return response.unauthorized({ error: 'token not found' })
    }
    const [,token] = authorization.split('Bearer ')

    try {
      const APP_KEY = Env.get('APP_KEY') as string
      const decode = jwt.verify(token, APP_KEY) as TokenInfo
      request.tokenInfo = decode
      return next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return response.status(400).json({ error: { message: 'Sessão Expirada' } })
      }
      return response.status(400).json({ error })
    }
  }
}
