'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Post extends Model {
    static boot () {
        super.boot()

        this.addTrait('NoTimestamp')

        this.addHook('beforeSave', async (postInstance) => {
            postInstance.updated = Database.raw('CURRENT_TIMESTAMP')
        })
    }

    user () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Post
