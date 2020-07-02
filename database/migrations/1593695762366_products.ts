import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').notNullable().primary()
      table.string('name').notNullable()
      table.string('desc').notNullable()
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
