import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { LineItem } from './line-item';
import { Order } from './order';

@Entity({ tableName: 'Shipments' })
export class Shipment {
  // Properties

  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  @OneToMany({
    entity: 'LineItem',
    mappedBy: 'shipment',
  })
  lineItems = new Collection<LineItem>(this);

  @ManyToOne(() => Order, { hidden: true })
  order!: Order;
}
