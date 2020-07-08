import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').notNullable().primary()
      table.uuid('user_uuid').notNullable().references('uuid').inTable('users')
      table.string('name').notNullable()
      table.string('description')
      table.string('category').notNullable()
      table.decimal('price',6,2).notNullable()
      table.integer('stock').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
