import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';
import { v4 } from 'uuid';

import { buildMikroOrmConfig } from './config/mikro-orm';

import { LineItem, Order, Shipment } from './entities';

async function main(): Promise<void> {
  let orm: MikroORM<PostgreSqlDriver> | undefined = undefined;
  let em: SqlEntityManager<PostgreSqlDriver> | undefined = undefined;

  try {
    orm = await MikroORM.init(buildMikroOrmConfig());
    em = orm.em.fork();

    em.persist(
      em.create(Order, {
        id: 1234,
        number: '6789567833435',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    const shipments = [
      em.create(Shipment, {
        id: '67e24192-4454-41d5-af5f-25940b63b759',
        order: em.getReference(Order, 1234),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      em.create(Shipment, {
        id: '8d466cb1-8abc-4423-a1a8-5081ec43d26e',
        order: em.getReference(Order, 1234),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    const lineItems = [
      em.create(LineItem, {
        id: v4(),
        shipment: em.getReference(
          Shipment,
          '67e24192-4454-41d5-af5f-25940b63b759'
        ),
        order: em.getReference(Order, 1234),
        sku: 'TEST_SKU',
        name: 'Test Product',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      em.create(LineItem, {
        id: v4(),
        shipment: em.getReference(
          Shipment,
          '8d466cb1-8abc-4423-a1a8-5081ec43d26e'
        ),
        order: em.getReference(Order, 1234),
        sku: 'TEST_SKU_2',
        name: 'Test Product 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    shipments.forEach(shipment => em?.persist(shipment));
    lineItems.forEach(lineItem => em?.persist(lineItem));

    await em.flush();

    const order = await em.findOne(Order, 1234, {
      populate: ['lineItems', 'shipments', 'shipments.lineItems'],
      refresh: true,
    });

    console.log(`Found the order : ${String(order?.id)}`);
  } finally {
    await em?.removeAndFlush(em.getReference(Order, 1234));

    await orm?.close(true);
  }
}

void main();
