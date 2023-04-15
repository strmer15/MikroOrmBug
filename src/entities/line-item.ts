import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Order } from './order';
import { Shipment } from './shipment';

@Entity({ tableName: 'LineItems' })
export class LineItem {
  // Properties
  @PrimaryKey()
  id!: string;

  @Property()
  sku!: string;

  @Property()
  name!: string;

  @Property()
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  // Relationships
  @ManyToOne(() => Order, { hidden: true })
  order!: Ref<Order>;

  @ManyToOne(() => Shipment, { hidden: true })
  shipment!: Ref<Shipment>;
}
