'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForbiddenAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle ( error, { response } ) {
    return response.status(401).json({
      error:'No tiene autorización para eliminar este proyecto'
    })
  }
}

module.exports = ForbiddenAccessException
