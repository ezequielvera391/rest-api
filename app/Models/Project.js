'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {

    // creamos una relacion cada proyecto 'pertenece a' un usuario
    user () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Project