import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { LineItem } from './line-item';
import { Shipment } from './shipment';

@Entity({ tableName: 'Orders' })
export class Order {
  // Properties
  @PrimaryKey()
  id!: number;

  @Property()
  number!: string;

  @Property()
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  @OneToMany({
    entity: 'LineItem',
    mappedBy: 'order',
  })
  lineItems = new Collection<LineItem>(this);

  @OneToMany({ entity: 'Shipment', mappedBy: 'order' })
  shipments = new Collection<Shipment>(this);
}
