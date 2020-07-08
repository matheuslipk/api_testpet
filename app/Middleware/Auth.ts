import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import { TokenInfo } from '@ioc:Adonis/Core/Request'

export default class Auth {
  public async handle ({request, response, logger}: HttpContextContract, next: () => Promise<void>) {
    const authorization = request.header('authorization')

    if (!authorization) {
      return response.unauthorized({ error: 'token not found' })
    }
    const [,token] = authorization.split('Bearer ')

    try {
      const APP_KEY = Env.get('APP_KEY') as string
      const decode = jwt.verify(token, APP_KEY) as TokenInfo
      request.tokenInfo = decode
      logger.info(`AUTH: (${request.tokenInfo.uuid}) ${request.ip()} -> ${request.method()} `
          + ` ${request.url()} ${JSON.stringify(request.all())}`)
      return next()
    } catch (error) {
      logger.error(`AUTH: (${error.name}) ${request.ip()} -> ${request.method()} ${request.url()} ${JSON.stringify(request.all())}`)
      return response.unauthorized({error})
    }
  }
}
