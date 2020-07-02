declare module '@ioc:Adonis/Core/Request' {

  interface TokenInfo {
    uuid: string,
    iat: number,
    exp: number
  }

  interface RequestContract {
    tokenInfo?: TokenInfo
  }
}
