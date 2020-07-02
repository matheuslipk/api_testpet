import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').notNullable().primary()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
