'use strict'

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, request, response }, next) {
    try {
      if (request.header('authorization') === undefined) {
        return response.status(401).json({ 'message': 'token não encontrado' })
      } else {
        await auth.check()
      }
    } catch(err) {
      return response.status(401).json({ 'message': 'token expirado ou inválido' })
    }
    await next()
  }
}

module.exports = Auth
