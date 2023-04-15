import { Migration } from '@mikro-orm/migrations';

export class Migration20221017190400 extends Migration {
  /* eslint-disable @typescript-eslint/require-await */
  async up(): Promise<void> {
    const builder = this.getKnex();

    this.addSql(
      builder.schema
        .createTable('Orders', table => {
          table
            .integer('id')
            .primary({ constraintName: 'Orders_pkey' })
            .notNullable();
          table.string('number').notNullable();
          table.timestamps(true, true);
        })
        .toQuery()
    );

    this.addSql(
      builder.schema
        .createTable('Shipments', table => {
          table
            .uuid('id')
            .primary({ constraintName: 'Shipments_pkey' })
            .notNullable();
          table
            .integer('order_id')
            .index('Shipments_order_id_idx')
            .references('id')
            .inTable('Orders')
            .withKeyName('Shipments_order_id_fkey')
            .onDelete('CASCADE')
            .notNullable();
          table.timestamps(true, true);
        })
        .toQuery()
    );

    this.addSql(
      builder.schema
        .createTable('LineItems', table => {
          table
            .uuid('id')
            .primary({ constraintName: 'LineItems_pkey' })
            .notNullable();
          table
            .uuid('shipment_id')
            .index('LineItems_shipment_id_idx')
            .references('id')
            .inTable('Shipments')
            .withKeyName('LineItems_shipment_id_fkey')
            .onDelete('CASCADE')
            .notNullable();
          table
            .integer('order_id')
            .index('LineItems_order_id_idx')
            .references('id')
            .inTable('Orders')
            .withKeyName('LineItems_order_id_fkey')
            .onDelete('CASCADE')
            .notNullable();
          table.string('sku').index('LineItems_sku_idx').notNullable();
          table.string('name').notNullable();
          table.timestamps(true, true);
        })
        .toQuery()
    );
  }

  async down(): Promise<void> {
    const builder = this.getKnex();

    this.addSql(builder.schema.dropTable('Orders').toQuery());
    this.addSql(builder.schema.dropTable('Shipments').toQuery());
  }
}
