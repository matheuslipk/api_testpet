import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle ({request, logger}: HttpContextContract, next: () => Promise<void>) {
    logger.info(`GUEST: ${request.ip()} -> ${request.method()} ${request.url()}`)
    await next()
  }
}
